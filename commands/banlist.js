const usefullFunctions = require("../usefullFunctions/usefullFunctions.js");

module.exports = {
	name: 'banlist',
    description: 'Gives the list of the banned users of the server allows to unban them.',
    guildonly: true,
	execute(message, args) {
        //reaction filter
        const filter = (reaction, user) => {
            return ['◀️', '❌', '▶️'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        //predef of embed of 
        const banUserEmbed = {
            title: "Banlist of the server:",
            color: 15158332,
        };

        const banData = [];
        const avatarURL = [];
        i = 0;

        message.guild.fetchBans().then(bans => {
            bans.map(bannedUser => {
                userDescription = [];
                avatarURL.push(bannedUser.user.displayAvatarURL({dynamic: true}));

                userDescription.push(`**Username:** ${bannedUser.user.username}#${bannedUser.user.discriminator}`);
                userDescription.push(`\n**ID:** ${bannedUser.user.id}`);
                if (bannedUser.reason)
                    userDescription.push(`\n\n**Reason: ${bannedUser.reason}**`);
                
                banData.push(userDescription);
            });

            banUserEmbed.description = banData[banData.length - 1].join(' ');
            banUserEmbed.thumbnail = {url: avatarURL[banData.length - 1]};
            usefullFunctions.setEmbedFooter(banUserEmbed, banData);
            
            message.channel.send({embed: banUserEmbed}).then(embedSent => {
                embedSent.react('◀️');
                embedSent.react('❌');
                embedSent.react('▶️');
                emojiCollector = embedSent.createReactionCollector(filter, {time: 60000 * 3});

                i = banData.length - 1;

                emojiCollector.on('collect', (reaction) => {
                    if (reaction.emoji.name === '▶️')
                    {
                        if (i < banData.length - 1)
                        {
                            i++;
                            userEmbed = {
                                title: "Banlist of the server:",
                                color:  15158332,
                                description: banData[i].join(' '),
                                thumbnail: { url: avatarURL[i] },
                            };
                            usefullFunctions.setEmbedFooter(userEmbed, banData);
                            
                            embedSent.edit({embed: userEmbed});
                        }
                    }
                    else if (reaction.emoji.name === '❌')
                    {
                        //gets the ID of the current user
                        currentUserId = banData[i][2].substring(4, banData[i][2].length);
                        //gets the username of the current user
                        currentUserUsername = banData[i][1].substring(10, banData[i][1].length);

                        embedSent.guild.members.unban(currentUserId);
                        
                        console.log(banData[i][1] + 'has been unbanned');
                        message.channel.send('@' + currentUserUsername + ' has been unbanned!');
                    }
                    else if (reaction.emoji.name === '◀️')
                    {
                        if (i > 0)
                        {
                            i--;
                            userEmbed = {
                                title: "Banlist of the server:",
                                color:  15158332,
                                description: banData[i].join(' '),
                                thumbnail: { url: avatarURL[i] },
                            };
                            usefullFunctions.setEmbedFooter(userEmbed, banData);

                            embedSent.edit({embed: userEmbed});
                        }
                    }
                })
            });
        })
    }
}