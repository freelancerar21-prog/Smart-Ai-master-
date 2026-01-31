const express = require('express');
const OpenAI = require('openai');
const app = express();
app.use(express.json());

const grok = new OpenAI({
  apiKey: process.env.GROK_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

app.post('/chat', async (req, res) => {
  try {
    const completion = await grok.chat.completions.create({
      model: "grok-beta",
      messages: [{ role: "user", content: req.body.message }],
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));

