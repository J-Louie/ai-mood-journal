async function analyzeMood() {
  const input = document.getElementById("moodInput").value;
  const responseArea = document.getElementById("responseArea");

  responseArea.innerHTML = "Thinking...";

  const prompt = `
You are a helpful AI mood coach.
User said: "${input}"
1. Reflect the mood back in one sentence.
2. Suggest one action that might help them feel better.
`;

  const apiKey = "YOUR_OPENAI_API_KEY"; // Replace this securely in real apps!

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  const message = data.choices[0].message.content;
  responseArea.innerHTML = `<p>${message}</p>`;
}
const message = data.choices[0].message.content;
responseArea.innerHTML = `<p>${message}</p>`;

// Save the entry in localStorage
const entry = {
  input,
  response: message,
  timestamp: new Date().toLocaleString()
};

let history = JSON.parse(localStorage.getItem("journalEntries")) || [];
history.unshift(entry); // Add newest at the top
localStorage.setItem("journalEntries", JSON.stringify(history));

// Show journal history
displayHistory();
function displayHistory() {
  const history = JSON.parse(localStorage.getItem("journalEntries")) || [];
  const historyHTML = history.map(entry => `
    <div class="entry">
      <strong>${entry.timestamp}</strong>
      <p><em>You:</em> ${entry.input}</p>
      <p><em>AI:</em> ${entry.response}</p>
    </div>
  `).join("");

  document.getElementById("history").innerHTML = historyHTML;
}
