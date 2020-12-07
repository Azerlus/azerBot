module.exports = {
	execute(guild) {
        if(guild) {
            channel = guild.channels.cache.find(channel => channel.name === "help");

            channel.messages.fetch({ limit: 1 }).then(messages => {
                let lastMessage = messages.first();
                    lastMessage.react('❌');              
              })
              .catch(console.error);
        }
	},
};