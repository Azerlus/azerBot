module.exports = {
	name: 'vote',
    description: 'Creates a poll.',
    aliases: ['poll'],
    usage: '[question] [pollTime]',
    guildonly: true,
	cooldown: 60,
	execute(message, args) {
        const filter = (reaction) => {
            return ['👍 ', '👎'].includes(reaction.emoji.name);
        };
        
        let pollTime = args.pop();
        let i = 0;

        let question = args.join(' ');
        
        while(i != question.length)
        {
            if(question[i].includes('@'))
            {
                console.log(question[i]);
                //need to find a way to mention roles!!!! 
            }
            i++;
        }
        
        if(!question)
            return message.reply("You need to enter a question!");
        if(isNaN(pollTime))
            return message.reply("You need to enter a correct time value!");
         
        const voteEmbed = {
            title: question,
            color: 3447003,
            footer: { text: `Time for the vote: ${pollTime}minutes` }
        };

        message.channel.send({embed: voteEmbed}).then(embed => {
            embed.react('👍').then(() => embed.react('👎'));

            voteCollector = embed.createReactionCollector(filter, { time: 60000 * pollTime });

        });
    },
};