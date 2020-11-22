module.exports = {
	name: 'kick',
    description: 'Kick the mentionned user.',
    usage: '[user] [reason]',
    guildonly: true,
	cooldown: 60,
	execute(message, args) {
        if (!message.mentions.members.size || message.mentions.members.size > 1)
            return message.reply("you need to mention only one user!");

        const user = message.mentions.members.first();
        if (!user.kickable)
            return message.reply("you need to mention a valid user!");
        
        kickReason = args.slice(1).join(' ');
        user.kick(kickReason);

        if (!banReason)
            message.channel.send(user.user.username + " has been kicked");
        else
            message.channel.send(user.user.username + " has been kicked for: " + kickReason);
	},
};