module.exports = {
	name: 'ping',
	description: 'Send pong.',
	guildOnly: false,
	args: false,
	cooldown: 6,
	execute(message) {
		message.channel.send(`Pong.`);
	},
};

