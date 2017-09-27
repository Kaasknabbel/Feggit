const Discord = require('discord.js');

const client = new Discord.Client();
const PREFIX = "!";

var servers = {};
var exports = {};

client.on('ready', () => {
    console.log('I am a feggit!');
});

module.exports = Queue = function() {
  var vm = this;

  vm.queue = [];
  vm.currentDispatcher = undefined;
}

Queue.prototype.play = function(message) {
  var vm = this;
  var channel = getAuthorVoiceChannel(message);

  if (!channel) {
    vm.queue = [];
    return message.reply('You are not in a voice channel.');
  }

  var toPlay = vm.queue[0];
  if (!toPlay) {
    return message.reply('No songs in queue.');
  }

  channel.join().then(connection => {
    var stream = toPlay.stream();

    vm.currentDispatcher = connection.playStream(stream, {
      seek: 0,
      volume: 0.5
    });

    vm.currentDispatcher.on('end', event => {
      vm.remove(message);
    });

    vm.currentDispatcher.on('error', err => {
      vm.remove(message);
    });
}

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
            
            this.play(message);
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
