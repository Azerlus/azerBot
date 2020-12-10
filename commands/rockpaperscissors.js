module.exports = {
    name: 'rockpaperscissors',
    description: 'Plays rock paper scissors',
    aliases: ['rock', 'paper', 'scissors', 'shifumi'],
    usage: '[choice]',
    guildOnly: false,
    args: true,
    cooldown: 1,
    execute(message, args) {
        if (args) {
            let userChoice = args.shift().toLowerCase();
            let botChoice = Math.floor(Math.random() * Math.floor(3));

            if (userChoice != "rock" && userChoice != "paper" && userChoice != "scissors")
                return message.channel.reply("you need to choose between rock paper or scissors!");

            if (botChoice == 0) {
                message.channel.send("Rock!");
                botChoice = "rock";
            }
            else if (botChoice == 1) {
                message.channel.send("Paper!");
                botChoice = "paper";

            }
            else {
                message.channel.send("Scissors!");
                botChoice = "scissors";
            }

            if (botChoice == userChoice)
                return message.reply("Tie!");
            else if (botChoice == "rock" && userChoice == "scissors")
                return message.reply("GG EZ");
            else if (botChoice == "rock" && userChoice == "paper")
                return message.reply("BG WP");
            else if (botChoice == "paper" && userChoice == "scissors")
                return message.reply("BG WP");
            else if (botChoice == "paper" && userChoice == "rock")
                return message.reply("GG EZ");
            else if (botChoice == "scissors" && userChoice == "rock")
                return message.reply("GG EZ");
            else if (botChoice == "scissors" && userChoice == "paper")
                return message.reply("GG EZ");
        }
    },
};