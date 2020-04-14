const Discord = require('discord.js')
const fs = require('fs')
const path = require('path')
const config = require('./config')

const client = new Discord.Client()

import R6StatsAPI from 'r6stats'

const api = new R6StatsAPI({
  loginId: config.r6stats.login,
  password: config.r6stats.password,
  userAgent: config.r6stats.user_agent,
  baseUrl: config.r6stats.base_url
})

const PREFIX = '.';

const SUPPORTED_RESPONDERS = ['!r6s', '!r6stats', '!r6', 'r6s', 'r6stats', 'r6', '.r6', '.r6s']

const commands = []

loadCommands()

try {
  api.authenticate()
} catch (e) {
  console.error(e, 'Error authenticating R6Stats API Client')
}

setTimeout(() => {
  client.ws.connection.triggerReady()
}, 22500)

client.on('ready', () => {
  console.log(`Shard ${client.shard.id} online and ready to handle ${client.guilds.size} guilds!`)
})

client.on('error', e => {
  console.error(e)
})


client.on('message', messageHandler)
client.login(config.discord.token)

async function loadCommands () {
  const files = fs.readdirSync(path.join(__dirname, 'src', 'commands'))

  for (let file of files) {
    const { default: clazz } = await require(path.join(__dirname, 'src', 'commands', file))
    console.log(`Registering command ${ clazz.name }...`)
    commands.push(clazz)
  }

  console.log(`${ commands.length } command${ commands.length === 1 ? '': 's' } registered.`)
}

function messageHandler (message) {

	if (message.author.bot) return

  let args = message.content.substring(PREFIX.length).split(" ");

  if(message.content[0] == "."){
    switch(args[0]){
      case 'version':
        message.reply(`version ${pjson.version}`); break;   
      case 'clear':
      if(!args[1]) return message.reply('Please specify a number');
      if(args[1] <= 50) message.channel.bulkDelete(args[1]);
      else {
        message.channel.bulkDelete(50);
        message.reply('maximum is 50');
      } break;
      case 'stack':
      if(!args[1]) return message.reply('Please specify a number');
      if(args[1] > 0 && args[1] <= 5){
        if(args[1] == 1) message.channel.send(`@everyone Nous avons encore ${args[1]} place !`);
        else message.channel.send(`@everyone Nous avons encore ${args[1]} places !`);
      }
      break;
    }
}  
  
  if (!isOurCommand(message.content)) return

	let split = message.content.split(' ')
	if (split.length <= 1) return
	let command = split[1].toLowerCase()
	let argss = split.slice(2)

  for (let cmd of commands) {

    let cmdInstance = new cmd({ argss, message, command, api })
    if (cmdInstance.shouldInvoke()) {
      let channel = message.channel
      let name = channel.hasOwnProperty('name') ? `in #${channel.name}` : 'via DM'
      console.log(`Invoking command ${ command } ${name} with args ${argss.join(',')}`)
      cmdInstance.invoke()
      break
    }
  }
}

function isOurCommand(str) {
  let split = str.split(' ')
  if (split.length === 0) return false
  let cmd = split[0].toLowerCase()
  for (let responder of SUPPORTED_RESPONDERS) {
    if (cmd === responder) {
      return true
    }
  }
}
