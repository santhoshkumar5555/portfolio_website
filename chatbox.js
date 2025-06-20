const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');

function sendMessage() {
  const message = userInput.value.trim();
  if (message) {
    appendMessage(message, 'user');
    getBotResponse(message);
    userInput.value = '';
  }
}

function appendMessage(message, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(sender);
  messageDiv.textContent = message;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function getBotResponse(message) {
  const apiKey = "YOUR_API_KEY"; // Replace with your OpenAI API key

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant for a marketing portfolio website." },
          { role: "user", content: message }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      appendMessage("Error connecting to AI. Please try again later.", 'bot');
      return;
    }

    const data = await response.json();
    const botReply = data.choices[0].message.content.trim();
    appendMessage(botReply, 'bot');

  } catch (error) {
    appendMessage("Network error. Please check your connection.", 'bot');
    console.error(error);
  }
}
