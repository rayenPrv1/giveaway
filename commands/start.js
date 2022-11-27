const ms = require("ms");
const messages = require("../utils/message");
module.exports.run = async (client, message, args) => {
  // If the member doesn't have enough permissions
  if (
     !message.member.permissions.has("MANAGE_MESSAGES") &&
     !message.member.roles.cache.some(r => r.name === "Giveaways")
   ) {
    return message.reply(
      ":x: You need to have the manage messages permissions to start giveaways."
    );
  }

  // Giveaway duration
  let giveawayDuration = args[0];
  // If the duration isn't valid
  if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
    return message.reply(":x: You have to specify a valid duration!");
  }

  // Number of winners
  let giveawayNumberWinners = parseInt(args[1]);
  // If the specified number of winners is not a number
  if (isNaN(giveawayNumberWinners) || giveawayNumberWinners < 0) {
    return message.reply(
      ":x: You have to specify a valid number of winners!"
    );
  }

  // Giveaway prize
  let giveawayPrize = args[2];
  // If no prize is specified
  if (!giveawayPrize) {
    return message.reply(":x: You have to specify a valid prize!");
  }
  // Start the giveaway
  await client.giveawaysManager.start(message.channel, {
    // The giveaway duration
    duration: ms(giveawayDuration),
    // The giveaway prize
    prize: giveawayPrize,
    // The giveaway winner count
    winnerCount: giveawayNumberWinners,
    // Who hosts this giveaway
    hostedBy: client.config.hostedBy ? message.author : null,
    // Messages
    messages
  });
  message.delete()
}