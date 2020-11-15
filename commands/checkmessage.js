const { wordList } = require('../config.json');

module.exports = {
	name: 'checkmessage',
    description: 'checkmessage',
	execute(message) {
        const messageContent = message.content.trim().split(/ +/);
        messageContent.map(content =>{
            i = 0;
            while(i != wordList.length)
            {
                if(content.toLowerCase() == wordList[i][0])
                    return message.channel.send(wordList[i][1]);
                i++;
            }
        })
	},
};