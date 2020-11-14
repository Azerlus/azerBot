module.exports = {
	name: 'ping',
	description: 'Send pong.',
	execute(message) {
		message.channel.send(`Pong.`);
	},
};