module.exports = {
	name: 'unban',
    description: 'Unban the user from an ID.',
    usage: '[user] [reason]',
    guildonly: true,
	cooldown: 60,
	execute(message, args) {
        message.guild.members.unban(args[0]);
        return message.channel.send("The user has been unbanned");
	},
};