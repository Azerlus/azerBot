const { wordList } = require('./config.json');

module.exports = {
    name: 'checkmessage',
    description: 'checkmessage',
    execute(message) {
        const messageContent = message.content.trim().split(/ +/);
        messageContent.map(content => {
            for (const [key, value] of Object.entries(wordList)) {
                if (content.toLowerCase() == key && !message.author.bot) {
                    return message.channel.send(value);
                }
            }
        })
    },
};