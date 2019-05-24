import { app, BrowserWindow, remote, ipcMain, dialog } from 'electron';
import { MenuService } from './main/MenuService';
import { FileService } from './main/FileService';
import { FileTree } from './bean/FileTree';

declare var __dirname: string

let mainWindow: Electron.BrowserWindow

let fileService: FileService = new FileService()

// 初始化窗口和菜单函数

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    backgroundColor: '#80000000',
    titleBarStyle: 'hidden',
    hasShadow: true,
    // transparent: true,
    // darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      experimentalFeatures: true
    },

  });
  const fileName = `file://${__dirname}/index.html`;
  console.log(fileName);
  mainWindow.loadURL('http://localhost:9090/');
  // mainWindow.webContents.openDevTools();
  mainWindow.on('close', () => app.quit());
  mainWindow.on('resize', () => {
    let winSize = mainWindow.getContentSize();
    mainWindow.webContents.send('resize', winSize);
  });
}

function createMenu() {
  MenuService.buildMenu();
}

// app 监听事件

app.on('ready', () => {
  createWindow();
  // createMenu();
  // FileService.workerT();
})

app.on('window-all-closed', () => app.quit())

console.log(`Electron Version ${app.getVersion()}`)


// 主进程监听事件

ipcMain.on('open-file', (event) => {
  console.log('open-file');
  FileService.selectFile().then(data => {
    // console.log('selectFile:');
    event.sender.send('open-file-return', data);
  }).catch(err => {
    dialog.showErrorBox('打开文件失败', err);
  });
});

