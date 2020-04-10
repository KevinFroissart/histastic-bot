require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const PREFIX = '.';

var pjson = require('./package.json');

client.on('ready', () => {
    console.log(`This bot is online!`);
})

client.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");

    if(message.content[0] == "."){
        switch(args[0]){
            case 'esl':
                message.reply(`Hitastic ESL webpage : https://play.eslgaming.com/team/14621024/`); break;
            case 'author':
                message.reply('Froissart Kévin : kevin.froissart69@gmail.com'); break;
            case 'git':
                message.reply('Hitastic-Bot Git repository : https://github.com/KevinFroissart/histastic-bot'); break;
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
            case 'team':
                message.channel.send('Current roster : Kasket, Kali, Encre, Darky, Krma'); break;
            case 'help':
                message.channel.send(`try \`.esl\` to access the Hitastic esl webpage
try \`.git\` to access the Hitastic-Bot git repository
try \`.author\` to get the author informations
try \`.version\` to get the bot version
try \`.clear n\` to delete n messages
try \`.stack n\` if you are looking for n players
try \`.team\` to display the current roster
try \`.\` to`); break;
            default:
                message.reply(`invalid argument, try \`.help\` for further informations `);
        }
    }
})

client.login(process.env.BOT_TOKEN);
