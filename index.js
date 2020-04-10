require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`This bot is online!`);
})

client.on('message', msg=>{
    if(msg.content === "salut"){
        msg.reply('raconte pas ta vie fils de pute');
    }
})

client.login(process.env.BOT_TOKEN);
