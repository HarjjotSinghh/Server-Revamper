require('dotenv').config();
const BaseCommand = require('../../utils/structures/BaseCommand');
const mongoose = require('mongoose');
const { MessageEmbed } = require('discord.js');
import mainColor from '../../bot.js';

mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .catch(err => {
    handleError(err);
  });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log("Connected to the dataabase!");
});

const RevampScheme = new mongoose.Schema(
  {
    guild_id: String, // ID of the guild
    revamped_at: {type: Date, default: Date.now()}, // Revamed at; defaults to now
    revamped_by: String, // ID of the command invoker
    emoji: String, // Emoji used to revamp the server
    divider: String, // Divider used to revamp the server
    total_text_channels: Number, // total # of text channels revamped
    total_voice_channels: Number, // total # of voice channels revamped
    total_categories: Number, // total # of categories revamped
  }
);

module.exports = class RevampCommand extends BaseCommand {
  constructor() {
    super('revamp', 'revamp', []);
  }

  async run(client, message, args) {
    if (args.length > 0 && args[0]  === 'server') {
      // var x = message.channel.send("React with an emoji!");
      const filter = (reaction, user) => {
        return user.id === message.author.id && reaction.message.channel.id == message.channel.id
      };
      message.channel.send("React with an emoji!").then((message) => {
        message.awaitReactions(filter, {max: 1, time: 120000, errors: ['time']})
        .then(collected => {
          const reaction = collected.first();
          const emoji = reaction.emoji;
          const one = "┃";
          const two = "┇";
          const three = "┝";
          const four = "╏";
          const five = "║";
          const six = "╠";
          const seven = "▪";
          const msg = `${message.author.tag}, You selected the \\${emoji} emoji!\n
          Now lets select a **type of divider**!\n
          :one: = \`${emoji}${one}#channel-name\`\n
          :two: = \`${emoji}${two}#channel-name\`\n
          :three: = \`${emoji}${three}#channel-name\`\n
          :four: = \`${emoji}${four}#channel-name\`\n
          :five: = \`${emoji}${five}#channel-name\`\n
          :six: = \`${emoji}${six}#channel-name\`\n
          :seven: = \`${emoji}${seven}#channel-name\`\n`;
          const embedmsg = new MessageEmbed()
          .setAuthor({name: message.author.tag, iconUrl: message.author.avatarURL()})
          .setColor(mainColor)
          .setDescription(msg);
          await message.channel.send(embedmsg);
        })

        .catch((err) => {
          // console.error(err);
          message.channel.send(`You didn't react with an emoji in time! Try again!`);
        });
      });
      // await message.channel.send(reaction);
    }
    else {
      if (args.length === 0) {
        return await message.channel.send("no args given, invoke **\`s!help revamp\`**");
      }
      else if (args.length > 0) {
        return await message.channel.send(`**\`s!revamp ${args.join(" ")}\`** is not a valid command`);
      };
    };
  };
};