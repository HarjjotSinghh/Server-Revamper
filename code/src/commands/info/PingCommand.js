const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');
import mainColor from '../../bot.js';

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'info', []);
  }
  async run(client, message, args) {
    const embed = new MessageEmbed()
      .setTitle(":ping_pong: Pong!")
      .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`**Ping**: ${Math.round(client.ws.ping)}ms`)
      .setColor([242, 31, 67]);
    let y = await message.channel.send(embed);
    const embed2 = new MessageEmbed()
    .setTitle(":ping_pong: Pong!")
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`**API Latency**: ${Math.round(client.ws.ping)}ms\n**Response Time**: ${Math.round(Date.now() - message.createdAt)}ms`)
    .setColor([242, 31, 67]);
    await y.edit("", {embed: embed2});
  };
};