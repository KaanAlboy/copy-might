const { clipboard } = require("electron");

let history = [];
const initText = clipboard.readText();

history.push(initText);

setInterval(() => {
  const text = clipboard.readText();
  if (history[history.length - 1] !== clipboard.readText()) {
    createDOMElement(text);
    history.push(text);
  }
}, 200);

const createDOMElement = (text) => {
  let clipboardItem = document.createElement("div");

  clipboardItem.classList.add("item");
  clipboardItem.onclick = () => copyItem(text);
  clipboardItem.oncontextmenu = () => removeItem(clipboardItem);

  let clipboardText = document.createElement("p");

  clipboardText.innerText = text;

  clipboardItem.appendChild(clipboardText);
  const list = document.getElementById("list");
  list.insertBefore(clipboardItem, list.firstChild);
};

const copyItem = (text) => {
  clipboard.writeText(text);
};

const removeItem = (item) => {
  item.remove();
};
