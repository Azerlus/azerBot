module.exports = {
	name: 'banlist',
    description: 'Gives the list of the banned users of the guild.',
    guildonly: true,
	execute(message, args) {
        const data = [];

        message.guild.fetchBans().then(bans => {
            banList = bans.map(bannedUser => {
                data.length = 0;
                data.push("\nHere's the list of all the banned members :\n");
                data.push('Username: ' + bannedUser.user.username + '#' + bannedUser.user.discriminator + '\n');
                data.push('ID: ' + bannedUser.user.id);
                message.channel.send(bannedUser.user.displayAvatarURL({dynamic: true}));
                message.channel.send(data, { split: true })
                });
            })
	},
};