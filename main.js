const { app, BrowserWindow } = require('electron');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const isDev = !app.isPackaged;
  const startURL = isDev
    ? "http://localhost:3000"  // Load from Next.js dev server in development
    : `file://${__dirname}/out/index.html`; // Use static build in production

  mainWindow.loadURL(startURL);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});