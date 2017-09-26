const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = "!";

var servers = {};

client.on('ready', () => {
    console.log('I am a feggit!');
});

client.on('message', message => {
    if (message.author.equals(client.user)) return;
    
    if (!message.content.startsWith(PREFIX)) return;
    
    if (message.content === 'ping') {
      message.reply('pong');
    }
});

client.on('message', message => {
    if (message.content === 'Tell me a story') {
      message.channel.sendMessage('Ronnie is a feggit');
    }
});

client.login(process.env.BOT_TOKEN);
