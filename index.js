const { app, BrowserWindow, Menu, MenuItem } = require("electron");
const path = require("path");

let mainWin;

function createWindow() {
  mainWin = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    title: "Todos",
  });

  mainWin.setTitle("Todos");
  mainWin.loadFile("main.html");

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
  //win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

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

const menuTemplate = [
  {
    label: "Todos",
    submenu: [
      {
        label: "Nouvelle tâche",
      },
      {
        label: "Quitter",
        click() {
          app.quit();
        }
      },
    ],
  },
];
// uniquement sur macos pour décaler le menu todos
if (process.platform === "darwin") {
  menuTemplate.unshift({ label: "" });
}
