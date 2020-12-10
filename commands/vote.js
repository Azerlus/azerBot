module.exports = {
    name: 'vote',
    description: 'Creates a poll.',
    aliases: ['poll'],
    usage: '[question] [pollTime]',
    guildOnly: true,
    args: true,
    cooldown: 60,
    execute(message, args) {
        const filter = (reaction) => {
            return ['👍', '👎'].includes(reaction.emoji.name);
        };

        let pollTime = args.pop();
        let roleMention = null;
        let thumbsUpCount = 0;
        let thumbsDownCount = 0;
        let data = [];

        let i = 0;
        console.log('args length == ' + args.length)
        while (i != args.length) {
            if (args[i].includes('@')) {
                console.log('i == ' + i);
                roleMention = args[i];
                args.splice(i, 1);
                break;
            }
            i++;
        }

        let question = args.join(' ');

        if (!question)
            return message.reply("You need to enter a question!");
        if (isNaN(pollTime))
            return message.reply("You need to enter a correct time value!");

        const voteEmbed = {
            title: question,
            color: 3447003,
            footer: { text: `Time for the vote: ${pollTime}minutes` }
        };

        if (roleMention)
            message.channel.send(roleMention);
        message.channel.send({ embed: voteEmbed }).then(embed => {
            embed.react('👍').then(() => embed.react('👎'));

            voteCollector = embed.createReactionCollector(filter, { time: 60000 * pollTime });

            voteCollector.on('end', (collected) => {
                for (const [key, value] of collected.entries()) {
                    if (value.emoji.name === '👍')
                        thumbsUpCount = value.count;
                    else if (value.emoji.name === '👎')
                        thumbsDownCount = value.count;
                }

                let totalVote = thumbsUpCount + thumbsDownCount;
                let thumbsUpPercentage = Math.round((thumbsUpCount / totalVote) * 100);
                let thumbsDownPercentage = Math.round((thumbsDownCount / totalVote) * 100);

                if (thumbsUpCount > thumbsDownCount) {
                    data.push("**👍 wins :**");
                    data.push(`Pour : ${thumbsUpCount} (${thumbsUpPercentage}%)`)
                    data.push(`Contre : ${thumbsDownCount} (${thumbsDownPercentage}%)`)
                }
                else if (thumbsDownCount > thumbsUpCount) {
                    data.push("**👎 wins :**");
                    data.push(`Contre : ${thumbsDownCount} (${thumbsDownPercentage}%)`)
                    data.push(`Pour : ${thumbsUpCount} (${thumbsUpPercentage}%)`)
                }
                else
                    data.push("**Tie**");

                message.channel.send(data, { split: true });
            });
        });
    },
};


/* NEED TO SEND IT IN ANOTHER CHANNEL (ALSO NEED TO FIND A WAY TO TAG A ROLE FROM
     ANOTHER CHANNEL (ADMIN CHANNEL))*/