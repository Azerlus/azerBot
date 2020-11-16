module.exports = {
	name: 'unban',
    description: 'Unban the mentionned user.',
    usage: '[user] [reason]',
    guildonly: true,
	cooldown: 60,
	execute(message, args) {
        message.guild.members.unban(args[0]);
	},
};