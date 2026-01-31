const express = require('express');
const OpenAI = require('openai');
const path = require('path');
const app = express();

app.use(express.json());

// public ফোল্ডার থেকে ফাইল লোড করার জন্য
app.use(express.static(path.join(__dirname, 'public')));

const grok = new OpenAI({
  apiKey: process.env.GROK_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

// চ্যাট এন্ডপয়েন্ট
app.post('/chat', async (req, res) => {
  try {
    const completion = await grok.chat.completions.create({
      model: "grok-beta",
      messages: [{ role: "user", content: req.body.message }],
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// সব রিকোয়েস্টের জন্য index.html রিটার্ন করবে
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
