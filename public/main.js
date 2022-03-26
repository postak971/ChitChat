const socket = io();
socket.on(
    "chatters-total",
    (data) =>
    (chattersTotal.textContent = `Currently, ${data} chatters are active.`)
);
const chattersTotal = document.querySelector(".chatters-total");
const chatContainer = document.querySelector("#chat-container");
const nameInput = document.querySelector("#name-input");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendChat();
});

function sendChat() {
    if (chatInput.value === '') return
    const data = {
        name: nameInput.value,
        chat: chatInput.value,
        dateTime: new Date(),
    };
    socket.emit("chat", data);
    addChatToUI(true, data);
    chatInput.value = "";
}
socket.on("chat-message", (data) => {
    addChatToUI(false, data);
});

function addChatToUI(myOwnMessage, data) {
    const chatElement = ` 
    <li class="${myOwnMessage ? "chat-right" : "chat-left"}">
    <p class="chat ">${data.chat}
    <span class="name-date">${data.name} 🕧 ${moment(
    data.dateTime
  ).fromNow()}</span></p>
</li>
`;
    chatContainer.innerHTML += chatElement;
    autoScroll();
}

function autoScroll() {
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}