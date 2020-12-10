const usefullFunctions = require("../usefullFunctions/usefullFunctions.js");

module.exports = {
    name: 'userinfo',
    description: 'Send details of a user.',
    aliases: ['user'],
    usage: ['user'],
    guildOnly: true,
    args: true,
    cooldown: 6,
    execute(message) {
        const filter = (reaction, user) => {
            return ['◀️', '▶️'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        const usersData = [];
        const avatarURL = [];

        const userInfosEmbed = {
            title: "Users info:",
            color: 3066993,
        };

        if (!message.mentions.users.size) {
            usersData.push(`**ID:** ${message.author.id}\n`);
            usersData.push(`**Username:** ${message.author.username}#${userMentionned.discriminator}\n`);

            avatarURL.push(message.author.displayAvatarURL({ dynamic: true }));

            userInfosEmbed.description = usersData.join(' ');
            userInfosEmbed.thumbnail = { url: avatarURL[0] };
            usefullFunctions.setEmbedFooter(userInfosEmbed, null, null);

            return message.channel.send({ embed: userInfosEmbed });
        }

        if (message.mentions.users.size == 1) {
            const userMentionned = message.mentions.users.first();

            usersData.push(`**ID:** ${userMentionned.id}\n`);
            usersData.push(`**Username:** ${userMentionned.username}#${userMentionned.discriminator}\n`);

            avatarURL.push(userMentionned.displayAvatarURL({ dynamic: true }));

            userInfosEmbed.description = usersData.join(' ');
            userInfosEmbed.thumbnail = { url: avatarURL[0] };
            usefullFunctions.setEmbedFooter(userInfosEmbed, null, null);

            return message.channel.send({ embed: userInfosEmbed });
        }

        const avatarList = message.mentions.users.map(user => {
            userDescription = [];

            avatarURL.push(user.displayAvatarURL({ dynamic: true }));

            userDescription.push(`**ID:** ${user.id}\n`);
            userDescription.push(`**Username:** ${user.username}#${user.discriminator}\n`);

            usersData.push(userDescription);
        });

        userInfosEmbed.description = usersData[usersData.length - 1].join(' ');
        userInfosEmbed.thumbnail = { url: avatarURL[usersData.length - 1] };
        usefullFunctions.setEmbedFooter(userInfosEmbed, usersData, usersData.length);

        message.channel.send({ embed: userInfosEmbed }).then(embedSent => {
            embedSent.react('◀️').then(() => embedSent.react('▶️'));
            emojiCollector = embedSent.createReactionCollector(filter, { time: 60000 * 3 });

            i = usersData.length - 1;
            console.log(usersData);
            emojiCollector.on('collect', (reaction) => {
                if (reaction.emoji.name === '▶️') {
                    if (i < usersData.length - 1) {
                        i++;
                        userEmbed = {
                            title: "Info of the user:",
                            color: 3066993,
                            description: usersData[i].join(' '),
                            thumbnail: { url: avatarURL[i] },
                        };
                        usefullFunctions.setEmbedFooter(userEmbed, usersData, i + 1);

                        embedSent.edit({ embed: userEmbed });
                    }
                }
                else if (reaction.emoji.name === '◀️') {
                    if (i > 0) {
                        i--;
                        userEmbed = {
                            title: "Info of the user:",
                            color: 3066993,
                            description: usersData[i].join(' '),
                            thumbnail: { url: avatarURL[i] },
                        };
                        usefullFunctions.setEmbedFooter(userEmbed, usersData, i + 1);

                        embedSent.edit({ embed: userEmbed });
                    }
                }
            })
        })
    },
};