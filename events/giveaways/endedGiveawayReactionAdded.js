const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member, reaction){
     reaction.users.remove(member.user);

  }
}
