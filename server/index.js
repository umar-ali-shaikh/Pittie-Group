require("dotenv").config();
const path = require("path");
const express = require("express");
const app = require("./app");

// Serve the static site itself when running as a standalone Node server
// (this is how it would run on Hostinger's Node.js hosting). On Vercel,
// the static files are served by Vercel directly and only api/contact.js
// is used, so this line is harmless there too.
app.use(express.static(path.join(__dirname, "..")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Pittie Group server running at http://localhost:${PORT}`);
});
