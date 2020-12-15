require('dotenv').config();
const BaseCommand = require('../../utils/structures/BaseCommand');
const mongoose = require('mongoose');
const { MessageEmbed } = require('discord.js');
const mainColor = require('../../bot').mainColor;
//import { mainColor } from '../../bot';

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
    if (args.length > 0 && args[0].toString().toLowerCase() === 'server') {
      // var x = message.channel.send("React with an emoji!");
      const filter = (reaction, user) => {
        return user.id === message.author.id && reaction.message.channel.id == message.channel.id
      };
      let reactionGif = 'https://support.discord.com/hc/article_attachments/360059596832/coffe_or_tea_poll_gif.gif';
      let howToReact = 'https://discordapp.fandom.com/wiki/Reactions#:~:text=To%20react%2C%20users%20must%20mouse,emojis%20present%20in%20the%20menu.';
      message.channel.send(new MessageEmbed()
      .setTitle("**React with an emoji!**")
      .setAuthor(message.author.tag.toString(), message.author.avatarURL())
      .setColor(mainColor)
      .setDescription(
      `・**[React](${howToReact} "click here if you don't know how to react") with an emoji** on this message to continue!
      ・The enoji with which you will react will be the **main emoji** of this server!
      ・That is, the emoji will be in the name of **every channel** of this server!`
      )
      .setImage(reactionGif)).then((msg) => {
        msg.awaitReactions(filter, {max: 1, time: 120000, errors: ['time']})
        .then(collected => {
          const reaction = collected[0];
          const emoji = reaction.emoji;
          const one = "┃";
          const two = "┇";
          const three = "┝";
          const four = "╏";
          const five = "║";
          const six = "╠";
          const seven = "▪";
          const msg = `You have selected the \\${emoji} emoji!
          Now lets select a **type of divider**!\n
          :one: = \`#${emoji}${one}channel-name\`
          :two: = \`#${emoji}${two}channel-name\`
          :three: = \`#${emoji}${three}channel-name\`
          :four: = \`#${emoji}${four}channel-name\`
          :five: = \`#${emoji}${five}channel-name\`
          :six: = \`#${emoji}${six}channel-name\`
          :seven: = \`#${emoji}${seven}channel-name\``;
          let embedmsg = new MessageEmbed()
          .setAuthor(message.author.tag.toString(), message.author.avatarURL())
          .setColor(mainColor)
          .setDescription(msg);
          message.channel.send(embedmsg);
          
        })

        .catch((err) => {
          // console.error(err);
          message.channel.send(new MessageEmbed()
          .setColor(mainColor)
          .setTitle("You did not react with an emoji!"));
        });
      });
      // await message.channel.send(reaction);
    }
    else {
      if (args.length === 0) {
        return message.channel.send("no args given, invoke **\`s!help revamp\`**");
      }
      else if (args.length > 0) {
        return message.channel.send(`**\`s!revamp ${args.join(" ")}\`** is not a valid command`);
      };
    };
  };
};