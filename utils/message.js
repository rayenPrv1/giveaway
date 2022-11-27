const config = require('../config.json');
module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "<a:906789397272334397:1030496552822775919>  **GIVEAWAY** <a:906789397272334397:1030496552822775919>",
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "<a:906789397272334397:1030496552822775919> **GIVEAWAY ENDED** <a:906789397272334397:1030496552822775919> ",
  drawing:  `Ends: {timestamp}`,
  inviteToParticipate: `React with <a:906789397272334397:1030496552822775919> to participate!`,
  winMessagereply:  "Congratulations, {winners}! You won **{this.prize}**!",
  embedFooter: "Giveaways",
  noWinner: "A winner could not be decided! needed, found 0",
  hostedBy: "Hosted by: {this.hostedBy}",
  winners: "winner(s)",
  endedAt: "Ended at"  ,     

}
