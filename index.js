process.on("unhandledRejection", error => {
  return console.log(error)
});
const Discord = require("discord.js");
require('./server')
const client = new Discord.Client({ intents: 7753 });
const fs = require("fs");
const config = require("./config.json");
client.config = config;

// Initialise discord giveaways
const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./storage/giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "BLACK",
    reaction: "🎉",
    lastChance: {
      enabled: true,
      content: ``,
      threshold: 5000,
      embedColor: 'BLACK'
    }
  }
});
client.on("guildCreate" , guild => {
if (guild.memberCount < 20){
guild.leave()
}
})  

/* Load all events (discord based) */


fs.readdir("./events/discord", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/discord/${file}`);
    let eventName = file.split(".")[0];
    //console.log(`[Event]   ✅  Loaded: ${eventName}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/discord/${file}`)];
  });
});

/* Load all events (giveaways based) */


fs.readdir("./events/giveaways", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/giveaways/${file}`);
    let eventName = file.split(".")[0];
    //console.log(`[Event]   🎉 Loaded: ${eventName}`);
    client.giveawaysManager.on(eventName, (...file) => event.execute(...file, client)), delete require.cache[require.resolve(`./events/giveaways/${file}`)];
  })
})

// Let commands be a new collection ( message commands )
client.commands = new Discord.Collection();
/* Load all commands */
fs.readdir("./commands/", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, {
      name: commandName,
      ...props
    });
    //console.log(`[Command] ✅  Loaded: ${commandName}`);
  });
});
// let interactions be a new collection ( slash commands  )
client.interactions = new Discord.Collection();
// creating an empty array for registering slash commands
client.register_arr = []
/* Load all slash commands */
fs.readdir("./slash/", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./slash/${file}`);
    let commandName = file.split(".")[0];
    client.interactions.set(commandName, {
      name: commandName,
      ...props
    });
    client.register_arr.push(props)
  });
});
 client.on("ready", () => {
  client.user.setStatus("idle");
});
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setStatus("online");
});
client.on("ready", () => {
    client.user.setActivity(`+ghelp`, { 
        type: "PLAYING"
    }); 
});

// Login through the client
client.login(process.env.token);
