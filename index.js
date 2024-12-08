const express = require('express');
const { Groq } = require('groq-sdk');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const apiKey = process.env.GROQ_API_KEY || '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';

const groqClient = new Groq({ apiKey });

app.post('/ask', async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).send({ error: 'Please provide a prompt' });
  }

  try {
    const systemPrompt = "You are Asta ai, created Asta ichiyukimøri a 15 year old Nigeria developer.";
    const chatMessages = [
      { "role": "system", "content": systemPrompt },
      { "role": "user", "content": prompt }
    ];

    const chatCompletion = await groqClient.chat.completions.create({
      "messages": chatMessages,
      "model": "llama3-70b-8192",
      "temperature": 0.6,
      "max_tokens": 8192,
      "top_p": 0.8,
      "stream": false,
      "stop": null
    });

    const assistantResponse = chatCompletion.choices[0].message.content;
    return res.send({ response: assistantResponse });
  } catch (error) {
    console.error("an error occurred", error);
    return res.status(500).send({ error: 'An error occurred' });
  }
});

app.get('/ask', async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).send({ error: 'Please provide a prompt' });
  }

  try {
    const systemPrompt = "You are Asta ai, created Asta ichiyukimøri a 15 year old Nigeria developer.";
    const chatMessages = [
      { "role": "system", "content": systemPrompt },
      { "role": "user", "content": prompt }
    ];

    const chatCompletion = await groqClient.chat.completions.create({
      "messages": chatMessages,
      "model": "llama3-70b-8192",
      "temperature": 0.6,
      "max_tokens": 8192,
      "top_p": 0.8,
      "stream": false,
      "stop": null
    });

    const assistantResponse = chatCompletion.choices[0].message.content;
    return res.send({ response: assistantResponse });
  } catch (error) {
    console.error("an error occurred", error);
    return res.status(500).send({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
