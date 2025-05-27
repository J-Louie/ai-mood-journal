export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { moodText } = req.body;
  if (!moodText) {
    return res.status(400).json({ error: 'No mood input provided' });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `
You are a helpful AI mood coach. User said: "${moodText}"
1. Reflect the mood back in one sentence.
2. Suggest one action that might help them feel better.
`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await openaiRes.json();
    console.log("OpenAI raw response:", JSON.stringify(data, null, 2));

const reply = data?.choices?.[0]?.message?.content;

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
}
