const { UserFlags } = require('discord.js');
const { roles } = require('./config.json');

module.exports = {
	execute(guild) {
        if(guild) {
            const filter = (reaction) => {
                return ['✅', '💥', '🐒', '🔪'].includes(reaction.emoji.name);
            };

            channel = guild.channels.cache.find(channel => channel.name === "help");

            channel.messages.fetch({ limit: 1 }).then(messages => {
                let lastMessage = messages.first();

                reFetchMessage(lastMessage);

                emojiCollector = lastMessage.createReactionCollector(filter);
                removeEmojiCollector = lastMessage.createReactionCollector(filter, { dispose: true });

                for (const [key, value] of Object.entries(roles)) {
                    lastMessage.react(value[0])
                }

                emojiCollector.on('collect', (reaction, user) => {
                 
                    for (const [key, value] of Object.entries(roles)) {
                        if(reaction.emoji.name === value[0] && !user.bot)
                        {
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
                        if(reaction.emoji.name === value[0] && !user.bot)
                        {
                            let role = guild.roles.cache.find(r => r.name === value[1]);
                            let member = guild.member(user);
    
                            member.roles.remove(role);
                            break;
                        }
                    }
                 
                });
              })
              .catch(console.error);
        }
	},
};

async function reFetchMessage(message)
{
    await message.fetch();
    return message;
}