module.exports = {
    name: 'unban',
    description: 'Unban the user from an ID.',
    usage: '[user]',
    guildOnly: true,
    args: true,
    cooldown: 60,
    execute(message, args) {
        if (args[0]) {
            message.guild.members.unban(args[0]);
            return message.channel.send("The user has been unbanned");
        }
        else
            return message.channel.reply("you need to give a valid ID");
    },
};