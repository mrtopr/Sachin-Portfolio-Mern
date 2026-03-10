// backend/config/openai.js
// Using Google Gemini via OpenAI-compatible endpoint
const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});
module.exports = openai;
