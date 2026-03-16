// Simple Express proxy to handle Gemini API calls server-side
// Reads GEMINI_API_KEY from environment

import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
const port = process.env.PORT || 5001;

app.use(cors({ origin: true }));
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';
let ai;
try {
  ai = new GoogleGenAI({ apiKey });
} catch (e) {
  console.error('Failed to initialize Gemini client in proxy:', e?.message ?? e);
  ai = null;
}

app.post('/api/gemini/chat', async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: 'Gemini client not configured' });
  }

  const { message, model = 'gemini-3-flash-preview', systemInstruction } = req.body || {};
  try {
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: systemInstruction ||
          "You are a helpful customer assistant for 'Auto Kits GH', a premium Ghanaian car aesthetics & spare parts dealer. You help customers find parts, check compatibility, and answer questions about body kits, bumpers, and performance parts. Keep answers concise and friendly. Suggest they order via WhatsApp for quick service.",
      }
    });
    const response = await chat.sendMessage({ message: message || '' });
    res.json({ text: response?.text ?? '' });
  } catch (err) {
    console.error('Gemini proxy error:', err);
    res.status(500).json({ error: 'Proxy error' });
  }
});

app.listen(port, () => {
  console.log(`Gemini proxy listening on port ${port}`);
});
