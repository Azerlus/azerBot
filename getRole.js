const { roleChannel, roleMessage, roles } = require('./config.json');

module.exports = {
    execute(guild) {
        if (guild) {
            const filter = (reaction) => {
                return ['✅', '💥', '🐒', '🔪'].includes(reaction.emoji.name);
            };

            channel = guild.channels.cache.find(channel => channel.name === roleChannel);

            channel.messages.fetch({ limit: 1 }).then(messages => {
                let lastMessage = messages.first();

                if (!lastMessage) {
                    channel.send(roleMessage).then(message => {
                        roleSelector(message, guild, filter);
                    });
                }
                else
                    roleSelector(lastMessage, guild, filter);
            })
                .catch(console.error);
        }
    },
};

function roleSelector(message, guild, filter) {
    emojiCollector = message.createReactionCollector(filter);
    removeEmojiCollector = message.createReactionCollector(filter, { dispose: true });

    for (const [key, value] of Object.entries(roles))
        message.react(value[0]);

    emojiCollector.on('collect', (reaction, user) => {

        for (const [key, value] of Object.entries(roles)) {
            if (reaction.emoji.name === value[0] && !user.bot) {
                let role = guild.roles.cache.find(r => r.name === value[1]);
                let member = guild.member(user);

                member.roles.add(role);
                user.send(`**${guild.name}** : added the role ${value[1]}`)
                break;
            }
        }
    });

    removeEmojiCollector.on('remove', (reaction, user) => {
        for (const [key, value] of Object.entries(roles)) {
            if (reaction.emoji.name === value[0] && !user.bot) {
                let role = guild.roles.cache.find(r => r.name === value[1]);
                let member = guild.member(user);

                member.roles.remove(role);
                break;
            }
        }
    });
}
