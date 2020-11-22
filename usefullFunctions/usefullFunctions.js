module.exports = {
    setEmbedFooter: function setEmbedFooter(embedMessage, data)
    {
        embedMessage.timestamp = new Date();
        if (data)
            if (data.length)
                embedMessage.footer = { text: `${data.length}\/${data.length}` }
    
        return embedMessage;
    }
 }