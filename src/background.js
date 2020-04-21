'use strict'

import { app, protocol, BrowserWindow,Menu,ipcMain} from 'electron'
Menu.setApplicationMenu(null);

import {
  createProtocol,
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
import fa from "element-ui/src/locale/lang/fa";
import el from "element-ui/src/locale/lang/el";
const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win,welcome;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }]);

function createWelcome() {
  welcome = new BrowserWindow({ width: 500, height: 320,
    icon: './utils/icon.png',
    show: false,
    backgroundColor: '#2f343f',
    frame: false,
    parent: win,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  if(isDevelopment){
    welcome.loadURL('http://localhost:8080/#/welcome')
  }else{
    createProtocol('app');
    welcome.loadURL('app://./index.html#/welcome')
  }
  welcome.once('ready-to-show',()=>{
    welcome.show();
    //加载时创建主窗口对象
    createWindow();
  });
  welcome.on('closed', () => {
    welcome = null
  })
}
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 500,
    icon: './utils/icon.png',
    show: false,
    backgroundColor: '#2f343f',
    frame: false,
    webPreferences: {
      nodeIntegration: true,
  }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    // win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    win.loadURL('http://localhost:8080/');
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
    // win.webContents.openDevTools();
  }
  win.once('ready-to-show',()=>{
    setTimeout(()=>{
      welcome.hide();
      welcome.close();
      welcome = null;
    },2000);
    setTimeout(()=>{
      win.show();
      win.center();
    },4000);
  });
  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

  }
  //为了优化性能先渲染页面，隐藏，延时后显示

  //关闭欢迎页
  createWelcome();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

//监听自定义信号
ipcMain.on('min',()=>{
  win.minimize();
});

ipcMain.on('full',()=>{
  if(win.isMaximized()){
    win.unmaximize();
    win.setSize(800,500,true);
    win.center();
  }else{
    win.maximize();
  }
});

ipcMain.on('close',()=>{
  win.close();
});

ipcMain.on('clean',()=>{
  win.webContents.session.clearCache();
  win.reload();
});