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
    
    var args = message.content.substring(PREFIX.length).split(" ");
    
    switch (args[0].toLowerCase()) {
        case "ping":
            message.channel.sendMessage('Pong!');
            break;
        case "whatisronnie":
            message.channel.sendMessage('/tts Ronnie is a feggit');
            break;
        case "play":
            message.channel.sendMessage('No...');
            break;
        default:
            message.channel.sendMessage('Invalid command, feggit');
    }
});

client.login(process.env.BOT_TOKEN);
