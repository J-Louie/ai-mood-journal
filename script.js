async function analyzeMood() {
  const input = document.getElementById("moodInput").value;
  const responseArea = document.getElementById("responseArea");

  responseArea.innerHTML = "Thinking...";

  try {
    const res = await fetch("https://ai-mood-journal.vercel.app/api/mood", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ moodText: input })
});

    const data = await res.json();
    const message = data.reply || "Sorry, I couldn't understand that.";
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
  } catch (err) {
    console.error(err);
    responseArea.innerHTML = `<p>Error contacting mood AI.</p>`;
  }
}

// This function should be outside of analyzeMood
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
