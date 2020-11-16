module.exports = {
    name: 'userinfo',
    description: 'Send details of a user.',
    aliases: ['user'],
    usage: ['user'],
	execute(message) {
        const data = [];
		if (!message.mentions.users.size) {
            data.push('Here are your infos');
            data.push(`ID: ${message.author.id}`);
            data.push(`Username: ${message.author.username}`);
            message.channel.send(message.author.displayAvatarURL({dynamic: true}));
            return message.channel.send(data, { split: true})
        }

        const avatarList = message.mentions.users.map(user => {
            data.length = 0;
            data.push(`Here are ${user.username}'s info:`);
            data.push(`ID: ${user.id}`);
            data.push(`Username: ${user.username}`);
            message.channel.send(user.displayAvatarURL({dynamic: true}));
            return message.channel.send(data, {split: true})
        });
	},
};