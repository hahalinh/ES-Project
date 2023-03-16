const electron = require("electron");
const path = require("path");
const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

require('@electron/remote/main').initialize();

function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true, contextIsolation: false, enableRemoteModule: true },
  });
  // and load the index.html of the app.
  // console.log(__dirname);
  window.webContents.openDevTools();
  window.loadFile(path.join(__dirname, "../build/index.html"));
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})