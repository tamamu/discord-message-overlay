
const BOT_TOKEN  = "" // write bot token (user token is restricted by discord.js)
/// const FILTER_CHANNEL = ['random'] // write channel names to show messages
const FILTER_CHANNEL = [] // show all channel messages if empty

const {app, BrowserWindow} = require('electron')
const path = require('path')
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function createWindow () {
  const mainWindow = new BrowserWindow({
    transparent: true,
    frame: false,
    fullscreen: true,
    minimizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.setIgnoreMouseEvents(true)
  mainWindow.setAlwaysOnTop(true, 'screen-saver')
  mainWindow.setVisibleOnAllWorkspaces(true)
  mainWindow.loadFile('index.html')
  
  client.on('message', message => {
    if (message.channel.name
      && (FILTER_CHANNEL.length === 0 || (FILTER_CHANNEL.length > 0 && FILTER_CHANNEL.includes(message.channel.name)))
      ) {
      const data = {
        content: message.content,
        createdAt: message.createdAt,
        userName: message.author.username,
        displayName: message.member.displayName,
        userId: message.author.id,
        avatarURL: message.author.avatarURL({size: 32}),
        channel: message.channel.name,
      }
      mainWindow.webContents.send('discordMessage', data)
    }
  });
  client.login(BOT_TOKEN)
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
