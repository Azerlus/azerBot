const usefullFunctions = require("../usefullFunctions/usefullFunctions.js");

module.exports = {
    name: 'banlist',
    description: 'Gives the list of the banned users of the server allows to unban them.',
    aliases: ['jail'],
    args: false,
    guildOnly: true,
    cooldown: 6,
    execute(message) {
        const filter = (reaction, user) => {
            return ['◀️', '❌', '▶️'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        const banUserEmbed = {
            title: "Banlist of the server:",
            color: 15158332,
        };

        const bansData = [];
        const avatarURL = [];
        i = 0;

        message.guild.fetchBans().then(bans => {
            bans.map(bannedUser => {
                userDescription = [];
                avatarURL.push(bannedUser.user.displayAvatarURL({ dynamic: true }));

                userDescription.push(`**Username:** ${bannedUser.user.username}#${bannedUser.user.discriminator}`);
                userDescription.push(`\n**ID:** ${bannedUser.user.id}`);
                if (bannedUser.reason)
                    userDescription.push(`\n\n**Reason: ${bannedUser.reason}**`);

                bansData.push(userDescription);
            });

            banUserEmbed.description = bansData[bansData.length - 1].join(' ');
            banUserEmbed.thumbnail = { url: avatarURL[bansData.length - 1] };
            usefullFunctions.setEmbedFooter(banUserEmbed, bansData, bansData.length);

            message.channel.send({ embed: banUserEmbed }).then(embedSent => {
                embedSent.react('◀️').then(() => embedSent.react('❌').then(() => embedSent.react('▶️')));

                emojiCollector = embedSent.createReactionCollector(filter, { time: 60000 * 3 });

                i = bansData.length - 1;

                emojiCollector.on('collect', (reaction) => {
                    if (reaction.emoji.name === '▶️') {
                        if (i < bansData.length - 1) {
                            i++;
                            userEmbed = {
                                title: "Banlist of the server:",
                                color: 15158332,
                                description: bansData[i].join(' '),
                                thumbnail: { url: avatarURL[i] },
                            };
                            usefullFunctions.setEmbedFooter(userEmbed, bansData, i + 1);

                            embedSent.edit({ embed: userEmbed });
                        }
                    }
                    else if (reaction.emoji.name === '❌') {
                        //gets the ID of the current user
                        currentUserId = bansData[i][1].substring(8, bansData[i][1].length);
                        //gets the username of the current user
                        currentUserUsername = bansData[i][0].substring(14, bansData[i][0].length);

                        console.log(currentUserId);
                        console.log(currentUserUsername);

                        embedSent.guild.members.unban(currentUserId);

                        message.channel.send('@' + currentUserUsername + ' has been unbanned!');
                    }
                    else if (reaction.emoji.name === '◀️') {
                        if (i > 0) {
                            i--;
                            userEmbed = {
                                title: "Banlist of the server:",
                                color: 15158332,
                                description: bansData[i].join(' '),
                                thumbnail: { url: avatarURL[i] },
                            };
                            usefullFunctions.setEmbedFooter(userEmbed, bansData, i + 1);

                            embedSent.edit({ embed: userEmbed });
                        }
                    }
                })
            });
        })
    }
}