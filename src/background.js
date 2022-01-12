'use strict'
/* global __static */
const fs = require('fs-extra')
import {
    app,
    protocol,
    BrowserWindow,
    Menu,
    ipcMain
} from 'electron'
import {
    autoUpdater
} from 'electron-updater'
const log = require('electron-log')

// const { app, protocol, BrowserWindow, Menu, ipcMain } = window.require('electron').remote;
// const { autoUpdater } = window.require('electron-updater').remote;
// const log = window.require('electron-log').remote;
import {
    createProtocol,
    installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
    scheme: 'app',
    privileges: {
        secure: true,
        standard: true
    }
}])

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1200,
        height: 620,
        icon: path.join(__static, 'icon.png'),
        webPreferences: {
            // 取消跨域限制
            webSecurity: false,
            // 集成node环境
            nodeIntegration: true,
            preload: 'app://' + __dirname + '/preload.js'
        }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        // 自动升级
        // autoUpdater.checkForUpdatesAndNotify()
        updateHandle()
        // autoUpdate()
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
        // 屏蔽菜单
        // createMenu()
        // 自动升级
        // autoUpdater.checkForUpdatesAndNotify()
        updateHandle()
    }

    win.on('closed', () => {
        win = null
    })

    log.transports.console.level = false
    log.transports.console.level = 'silly'
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

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
    createWindow()
})

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

// 设置菜单栏
function createMenu() {
    // darwin表示macOS，针对macOS的设置
    if (process.platform === 'darwin') {
        const template = [{
            label: 'App Demo',
            submenu: [{
                    role: 'about'
                },
                {
                    role: 'quit'
                }
            ]
        }]
        let menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
    } else {
        // windows及linux系统
        Menu.setApplicationMenu(null)
    }
}

// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
function updateHandle() {
    let updaterCacheDirName = 'electron-updater1'
    const updatePendingPath = path.join(autoUpdater.app.baseCachePath, updaterCacheDirName, 'pending')
    log.warn(updatePendingPath)
    fs.emptyDir(updatePendingPath)
    log.warn(autoUpdater.app.baseCachePath)
    let message = {
        error: '检查更新出错',
        // checking: '正在检查更新……',
        updateAva: '检测到新版本，正在下载……',
        // updateNotAva: '现在使用的就是最新版本，不用更新',
    }

    if (process.env.NODE_ENV === 'development') {
        autoUpdater.updateConfigPath = path.join(__dirname, 'default-app-update.yml')
    } else {
        // autoUpdater.updateConfigPath = path.join(__dirname, '../../../app-update.yml')
    }
    // 和之前vue.config.js配置的一样
    autoUpdater.setFeedURL("https://hootie.athenaca.com/download/client/")
    autoUpdater.autoDownload = false;
    autoUpdater.on('error', function(error) {

        log.warn(error)
        win.webContents.send('updateError', error)
    })
    // autoUpdater.on('checking-for-update', function () {
    //     sendUpdateMessage(message.checking)
    // })
    autoUpdater.on('update-available', function(info) {
        // sendUpdateMessage(message.updateAva)
        win.webContents.send('updateIsNew', info)
    })
    // autoUpdater.on('update-not-available', function (info) {
    //     sendUpdateMessage(message.updateNotAva)
    // })

    // 更新下载进度事件
    autoUpdater.on('download-progress', function(progressObj) {
                log.warn(progressObj);
        win.webContents.send('downloadProgress', progressObj)
    })

    autoUpdater.on('update-downloaded', function(event, releaseNotes, releaseName, releaseDate, updateUrl,
        quitAndUpdate) {
        ipcMain.on('isUpdateNow', (e, arg) => {
            log.debug(arguments)
            log.debug('开始安装')
            //some code here to handle event
            autoUpdater.quitAndInstall()
        })
        win.webContents.send('isUpdateNow')
    })

    ipcMain.on('checkForUpdate', () => {
        //执行自动更新检查
        autoUpdater.checkForUpdates()
    })

    ipcMain.on('downloadUpdate', () => {
        // 下载
        log.warn('执行下载')
        autoUpdater.downloadUpdate()
    })
}

// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage(text) {
    win.webContents.send('message', text)
}
