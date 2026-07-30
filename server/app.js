const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { sendContactEmail } = require("./mailer");

const app = express();

app.use(cors());
app.use(express.json());

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 submissions per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many submissions. Please try again later." },
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactBody(body) {
  const errors = {};
  const firstName = (body.firstName || "").trim();
  const lastName = (body.lastName || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const message = (body.message || "").trim();

  if (!firstName) errors.firstName = "First name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (!message) errors.message = "Message is required.";
  else if (message.length > 5000) errors.message = "Message is too long.";

  // Honeypot field: real users never fill this in; bots often do.
  if (body.website) errors._bot = "Spam detected.";

  return { errors, values: { firstName, lastName, email, phone, message } };
}

app.post("/api/contact", contactLimiter, async (req, res) => {
  const { errors, values } = validateContactBody(req.body || {});

  if (Object.keys(errors).length > 0) {
    if (errors._bot) {
      // Pretend success to the bot, don't actually send anything.
      return res.status(200).json({ ok: true });
    }
    return res.status(400).json({ ok: false, errors });
  }

  try {
    await sendContactEmail(values);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err.message);
    return res
      .status(500)
      .json({ ok: false, error: "Could not send your message right now. Please try again later." });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

module.exports = app;
