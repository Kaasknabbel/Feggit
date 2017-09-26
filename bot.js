const Discord = require('discord.js');
//const YTDL = require('ytdl-core');

const client = new Discord.Client();
const PREFIX = "!";

var servers = {};

function play(connection, message) {
    var server = servers[message.guild.id];
    
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    
    server.queue.shift();
    
    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

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
            if (!args[1]) {
                message.channel.sendMessage('Please provide a link, feggit');
                return;
            }
            
            if (!message.member.voiceChannel) {
                message.channel.sendMessage('You must be in a voicechannel, feggit');
                return;
            }
            
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
            
            var server = servers[message.guild.id];
            
            server.queue.push(args[1]);
            
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
            break;
        case "skip":
            var server = servers[message.client.id];
            
            if (server.dispatcher) server.dispatcher.end();
            break;
        case "stop":
            var server = servers[message.client.id];
            
            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;
        default:
            message.channel.sendMessage('Invalid command, feggit');
    }
});

client.login(process.env.BOT_TOKEN);
