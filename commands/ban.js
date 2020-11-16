module.exports = {
	name: 'ban',
    description: 'Ban the mentionned user.',
    usage: '[user] [reason]',
    guildonly: true,
	cooldown: 60,
	execute(message, args) {
        if (!message.mentions.members.size)
            return message.reply("you need to mention only one user!");

        const user = message.mentions.members.first();
        if (!user.bannable)
            return message.reply("you need to mention a valid user!");
        
        banReason = args.slice(2).join(' ');
        user.ban({reason: banReason});
	},
};