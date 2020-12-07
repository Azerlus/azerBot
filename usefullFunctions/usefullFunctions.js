module.exports = {
    setEmbedFooter: function setEmbedFooter(embedMessage, data, i)
    {
        embedMessage.timestamp = new Date();
        if (data)
            if (data.length)
                embedMessage.footer = { text: `${i}\/${data.length}` }
    
        return embedMessage;
    },

    getGuildID: function getGuildID(message)
    {
        guildID = message.guild.id;

        console.log(guildID);
        return guildID;
    }
 }