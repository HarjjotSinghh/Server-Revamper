const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');
const mainColor = require('../../bot').mainColor;

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'info', []);
  }
  async run(client, message, args) {
    const embed = new MessageEmbed()
      .setTitle(":ping_pong: Pong!")
      .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`**Ping**: ${Math.round(client.ws.ping)}ms`)
      .setColor(mainColor);
    let y = await message.channel.send(embed);
    const embed2 = new MessageEmbed()
    .setTitle(":ping_pong: Pong!")
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`**API Latency**: ${Math.round(client.ws.ping)}ms\n**Response Time**: ${Math.round(Date.now() - message.createdAt)}ms`)
    .setColor(mainColor);
    await y.edit("", {embed: embed2});
  };
};