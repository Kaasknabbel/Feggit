const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am a feggit!');
});

client.on('message', message => {
    if (message.content === 'ping') {
      message.reply('pong');
    }
});

client.on('message', message => {
    if (message.content === 'Tell me a story') {
      message.reply('Ronnie is a feggit');
    }
});

client.login(process.env.BOT_TOKEN);
