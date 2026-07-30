// Vercel serverless entry point. Vercel auto-detects any file under /api
// as a function; exporting the Express app lets it handle the request.
require("dotenv").config();
const app = require("../server/app");

module.exports = app;
