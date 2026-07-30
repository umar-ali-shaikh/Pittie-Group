const nodemailer = require("nodemailer");

let cachedTransporter = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "Missing SMTP configuration. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (see .env.example).",
    );
  }

  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return cachedTransporter;
}

async function sendContactEmail({ firstName, lastName, email, phone, message }) {
  const transporter = getTransporter();

  const mailTo = process.env.MAIL_TO || process.env.SMTP_USER;
  const mailFrom = process.env.MAIL_FROM || process.env.SMTP_USER;

  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  await transporter.sendMail({
    from: `"Pittie Group Website" <${mailFrom}>`,
    to: mailTo,
    replyTo: email,
    subject: `New contact form submission from ${fullName}`,
    text: [
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone || "(not provided)"}`,
      "",
      "Message:",
      message,
    ].join("\n"),
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "(not provided)")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `,
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

module.exports = { sendContactEmail, getTransporter };
