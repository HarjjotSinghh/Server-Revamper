const { Client, Collection } = require("discord.js");
// const Collection = require('discord.js');
const client = new Client();
require('dotenv').config({
    path: __dirname + '/.env'
})

client.commands = new Collection();
client.aliases = new Collection();

const prefix = process.env['DISCORD_BOT_PREFIX'];

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}#${client.user.discriminator}!`);
  client.user.setPresence("Under Development!")
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  // If message.member is uncached, cache it.
  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
  if (cmd.length === 0) return;
  
  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // If a command is finally found, run the command
  if (command) 
      command.run(client, message, args);
});

client.login(process.env['DISCORD_BOT_TOKEN']);