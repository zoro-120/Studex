const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");
const typingIndicator = document.getElementById("typingIndicator");

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const text = messageInput.value.trim();
  if (text === "") return;

  addMessage(text, "sent");
  messageInput.value = "";

  simulateReply();
}

function addMessage(text, type) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", type);
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function simulateReply() {
  typingIndicator.style.display = "block";

  setTimeout(() => {
    typingIndicator.style.display = "none";
    addMessage("Thanks! I will confirm the book availability.", "received");
  }, 2000);
}
