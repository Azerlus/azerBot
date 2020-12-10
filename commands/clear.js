module.exports = {
    name: 'clear',
    description: 'Clear up to 100 messages.',
    aliases: ['prune'],
    usage: ['number of messages between 1 and 99'],
    args: true,
    guildOnly: true,
    cooldown: 30,
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount))
            return message.reply('You need to enter a valid number.');
        else if (amount <= 1 || amount > 100)
            return message.reply('You need to enter a number between 1 and 99.');

        message.channel.bulkDelete(amount, true).catch(err => {
            console.log(err);
            message.channel.send('There was an error trying to clear messages in this channel!');
        });
    },
}