import { app, BrowserWindow } from 'electron';
import * as isDev from 'electron-is-dev';
import * as path from 'path';

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    center: true,
    resizable: true,
    minWidth: 700,
    minHeight: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname)
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined!;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});