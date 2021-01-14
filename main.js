const { app, BrowserWindow, screen, Tray } = require("electron");
const path = require("path");

let tray = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 500,
    alwaysOnTop: true,
    icon: path.join(__dirname, "/icons/tray.png"),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  tray = new Tray(path.join(__dirname, "/icons/tray.png"));

  const screenWidth = screen.getPrimaryDisplay().workAreaSize.width;
  const screenHeight = screen.getPrimaryDisplay().workAreaSize.height;

  win.setPosition(screenWidth - 300, screenHeight - 500);
  win.removeMenu();

  tray.on("click", () => {
    win.show();
  });

  win.on("minimize", (event) => {
    event.preventDefault();
    win.hide();
  });

  win.loadFile(path.join(__dirname, "index.html"));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
