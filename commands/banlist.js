const { DiscordAPIError } = require("discord.js");

module.exports = {
	name: 'banlist',
    description: 'Gives the list of the banned users of the guild.',
    guildonly: true,
	execute(message, args) {
        
        const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        const banUserEmbed = {
            title: "Banlist of the server:",
            color: 6969,
        };

        const data = [];
        i = 0;

        message.guild.fetchBans().then(bans => {
            bans.map(bannedUser => {
                desc = [];
                banUserEmbed.description = null;
                desc.push("\nHere's the list of all the banned members :\n");
                desc.push('Username: ' + bannedUser.user.username + '#' + bannedUser.user.discriminator + '\n');
                desc.push('ID: ' + bannedUser.user.id);
                banUserEmbed.description = desc.join(' ');
                banUserEmbed.thumbnail = {url: bannedUser.user.displayAvatarURL({dynamic: true})};
                
                data.push(desc);
                i++;
            });

            message.channel.send({embed: banUserEmbed}).then(emoji => {
                emoji.react('👍');
                emoji.react('👎');
                emoji.awaitReactions(filter, {max: 1, time: 60000, errors: ['time']}).then(collected => {
                    const reaction = collected.first();
        
                    if (reaction.emoji.name === '👍') {
                        userEmbed = {
                            title: "Banlist of the server:",
                            color: 6969,
                            description: data[0].join(' '),
                        };

                        emoji.edit({embed: userEmbed});
                    }
                    else {
                        userEmbed = {
                            title: "Banlist of the server:",
                            color: 6969,
                            description: data[0].join(' '),
                        };
                        emoji.edit({embed: userEmbed});
                    }
                })
                .catch(collected => {
                    message.reply('ERROR = = = ' + collected);
                })
            });
        })
    }
}