// Vercel Serverless Function: /api/gemini-chat
// This file provides a production-ready Gemini proxy using serverless functions.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body = req.body || {};
  const message = body.message;
  // Production: default to Gemini 3.1 flash; allow override via GEMINI_MODEL or request body
  const defaultModel = process.env.GEMINI_MODEL || 'gemini-3.1-flash';
  const model = body.model || defaultModel;
  const systemInstruction = body.systemInstruction;

  // Basic structured logging for production visibility
  const logEvent = (level, msg, data) => {
    try {
      console.log(JSON.stringify({ ts: new Date().toISOString(), level, message: msg, data }));
    } catch (_) {
      // ignore logging failures
    }
  };

  logEvent('INFO', 'Gemini-chat request received', { model, messageLength: (message && message.length) || 0 });

  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: systemInstruction ||
          "You are a helpful customer assistant for 'Auto Kits GH', a premium Ghanaian car aesthetics & spare parts dealer. You help customers find parts, check compatibility, and answer questions about body kits, bumpers, and performance parts. Keep answers concise and friendly. Suggest they order via WhatsApp for quick service.",
      }
    });

    const response = await chat.sendMessage({ message: message || '' });
    logEvent('INFO', 'Gemini-chat response', { textLength: (response?.text || '').length });
    res.status(200).json({ text: response?.text ?? '' });
  } catch (err) {
    logEvent('ERROR', 'Gemini-chat proxy error', { error: err?.message ?? String(err) });
    res.status(500).json({ error: 'Proxy error' });
  }
}
