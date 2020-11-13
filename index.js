const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (message.content === '!ping') {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Pong.');
    }
	console.log(message.content);
});



client.login(config.BOT_TOKEN);
