require("dotenv").config({ path: ".env" });

const chalk = require("chalk");
const CronosXp = require("cronos-xp");

const { prefix } = require("./json/config.json");
const { loadCommands } = require("./utilities/loadcmds.js");
const { Client, Collection, Intents } = require("discord.js");

const client = new Client({
  allowedMentions: { parse: ["users", "roles"] },
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

console.log(process.env.mongo_url)
console.log(process.env.main_token)

const Level = new CronosXp(process.env.mongo_url, {
  linear: false, //Default value
  growthMultiplier: 30, //Default value
  returnDetails: false, //Default value
});

require("./utilities/loadevents")(client);

client.login(process.env.main_token).then(() => {
  console.log(
    chalk.bgBlueBright.black(
      ` Successfully logged in as: ${client.user.username}#${client.user.discriminator} `
    )
  );
});

client.commands = new Collection();
client.prefix = prefix;
client.queue = new Map();
client.xp = Level;
loadCommands(client);
