const Discord = require('discord.js');
const YTDL = require('ytdl-core');

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
    message.channel.sendMessage('I make it to the end of function play() <3');
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
            message.channel.sendMessage('Ronnie is a feggit', {tts: true});
            break;
        case "whatislove":
            message.channel.sendMessage("Baby don't hurt me", {tts: true});
            break;
        case "play":
            if (!args[1]) {
                message.channel.sendMessage('Please provide a link, feggit');
                return;
            };
            
            if (!message.member.voiceChannel) {
                message.channel.sendMessage('You must be in a voicechannel, feggit');
                return;
            };
            
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
            
            var server = servers[message.guild.id];
            var channel = message.sender.voiceChannel;
            
            server.queue.push(args[1]);
  
            if (!message.guild.voiceConnection) client.joinVoiceChannel(channel, (connection, error) => {
                if (error)
                    message.channel.sendMessage(error);
                play(connection, message);
            )};
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
