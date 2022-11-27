
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config = require('../config.json');

module.exports.run = async (client, message, args) => {

const embed = new MessageEmbed()
.setTitle(`Commands of ${client.user.username}`)
.setColor('#2F3136')
.setDescription('**Please Select a category to view all its commands**')
.addField(`Links:`,`- [invite Link](https://discord.com/api/oauth2/authorize?client_id=963400559774298133&permissions=8&scope=bot%20applications.commands)`,true)
.setTimestamp()


  const giveaway = new MessageEmbed()
  .setTitle("Categories » Giveaway")
  .setColor('#2F3136')
  .setDescription("```yaml\nHere are the giveaway commands:```")
  .addFields(

    { name: '+gstart' , value: `to start a Giveaway`, inline: true },
    { name: '+reroll' , value: `to roll a new winner`, inline: true },
    { name: '+gend' , value: `to ends a Giveaway`, inline: true },
  )

  const general = new MessageEmbed()
  .setTitle("Categories » General")
  .setColor('#2F3136')
  .setDescription("```yaml\nHere are the general bot commands:```")
  .addFields(
    { name: 'Help'  , value: `Shows all available commands to this bot!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Invite' , value: `Get the bot's invite link!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Ping' , value: `Check the bot's websocket latency!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
  )

  const components = (state) => [
    new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId("help-menu")
        .setPlaceholder("Please Select a Category")
        .setDisabled(state)
        .addOptions([{
                label: `Giveaways`,
                value: `giveaway`,
                description: `View all the giveaway based commands!`,
                emoji: `🎉`
            },
            {
                label: `General`,
                value: `general`,
                description: `View all the general bot commands!`,
                emoji: `⚙`
            }
        ])
    ),
];

const initialMessage = await message.reply({ embeds: [embed], components: components(false) });

const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector(
            {
                filter,
                componentType: "SELECT_MENU",
                time: 300000
            });

        collector.on('collect', (interaction) => {
            if (interaction.values[0] === "giveaway") {
                interaction.update({ embeds: [giveaway], components: components(false) });
            } else if (interaction.values[0] === "general") {
                interaction.update({ embeds: [general], components: components(false) });
            }
        });
        collector.on('end', () => {
          initialMessage.edit({ components: components(true) });
      }
      )
}
