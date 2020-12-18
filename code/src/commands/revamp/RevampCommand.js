require('dotenv').config();
const BaseCommand = require('../../utils/structures/BaseCommand');
const mongoose = require('mongoose');
const { MessageEmbed } = require('discord.js');
const mainColor = require('../../bot').mainColor;
const tick = require('../../bot').tick;
const cross = require('../../bot').cross;
const RevampSchema = require('../../models/revampSchema.js');
const revampFunc = require('../../utils/revampFunc.js');
const { off } = require('../../models/revampSchema.js');
//import { mainColor } from '../../bot';


// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error: '));
// db.once('open', function() {
//   console.log("Connected to the dataabase!");
// });



module.exports = class RevampCommand extends BaseCommand {
  constructor() {
    super('revamp', 'revamp', []);
  }

  async run(client, message, args) {
    mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        .catch(err => {
          message.channel.send(`Ran into an error while connecting to the database.`)
          handleError(err);
          return
      });
    const check = RevampSchema.findOne({guild_id: message.guild.id.toString()});
    check.exec()
    .then((result) =>{
      if (result) {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let e2 = new MessageEmbed()
        .setTitle("**Already Revamped!**")
        .setAuthor(message.author.tag.toString(), message.author.avatarURL())
        .setColor(mainColor)
        .setDescription(`This server has already been revamped with these settings.`)
        .addField("Emoji:", '\\' + result.emoji, true)
        .addField("Divider:", result.divider, true)
        .addField("Revamped at:", result.revamped_at.toLocaleString(undefined,options), true)
        .addField("Extra info:", `Roles revamped: **${result.total_roles}**
        Text channels revamped: **${result.total_text_channels}**
        Voice channels revamped: **${result.total_voice_channels}**
        Categories revamped: **${result.total_categories}**`, false)
        .addField("Revamped by:", "<@" + result.revamped_by + ">", true)
        .addField("More info:",
        `・If you would like to reset the revamp done, you can use **\`s!revamp reset\`**.
        ・If you have made any changes to the server after the revamp is done, please use **\`s!revamp reset -f\`**.`, false);
        message.channel.send(e2);
        return;
      }
      else {
        if (args.length > 0 && args[0].toString().toLowerCase() === 'server') {
          // console.log(data);
          // var x = message.channel.send("React with an emoji!");
          // if (result) {return}
          const filter = (reaction, user) => {
            return user.id === message.author.id && reaction.message.channel.id == message.channel.id
          };
          let reactionGif = 'https://support.discord.com/hc/article_attachments/360059596832/coffe_or_tea_poll_gif.gif';
          let howToReact = 'https://discordapp.fandom.com/wiki/Reactions#:~:text=To%20react%2C%20users%20must%20mouse,emojis%20present%20in%20the%20menu.';
          message.channel.send(new MessageEmbed()
          .setTitle("**Select an emoji!**")
          .setAuthor(message.author.tag.toString(), message.author.avatarURL())
          .setColor(mainColor)
          .setDescription(
          `・**[React](${howToReact} "click here if you don't know how to react") with an emoji** on this message to continue!
          ・The emoji with which you will react will be the **main emoji** of this server!
          ・That is, the emoji will be in the name of **every channel** of this server!
          ・*You have 3 minutes to react to this message.*`
          )
          .setImage(reactionGif))
          .then((msg) => {
            msg.awaitReactions(filter, {max: 1, time: 300000, errors: ['time']})
            .then(collected => {
              const reaction = collected.first();
              if (reaction.emoji.id != null) {
                message.channel.send(
                  new MessageEmbed()
                  .setTitle("**Sorry!**")
                  .setAuthor(message.author.tag.toString(), message.author.avatarURL())
                  .setColor(mainColor)
                  .setDescription(`・We are so sorry but **discord does not allow** having custom emojis in channel names/role names.
                  ・Please run the command again with and choose a **default emoji**.
                  ・Thanks a lot!`)
                )
                return
              };
              const emoji = reaction.emoji;
              const one = "┃";
              const two = "┇";
              const three = "┝";
              const four = "╏";
              const five = "║";
              const six = "╠";
              const seven = "・";
              const msg = `・You have selected the \\${emoji} emoji!
              ・Now lets select a **type of divider**!\n
              ・:one: = \`#${emoji}${one}channel-name\`
              ・:two: = \`#${emoji}${two}channel-name\`
              ・:three: = \`#${emoji}${three}channel-name\`
              ・:four: = \`#${emoji}${four}channel-name\`
              ・:five: = \`#${emoji}${five}channel-name\`
              ・:six: = \`#${emoji}${six}channel-name\`
              ・:seven: = \`#${emoji}${seven}channel-name\`
              ・*You have 3 minutes to react to this message.*`;
              let divider = '';
              let embedmsg = new MessageEmbed()
              .setAuthor(message.author.tag.toString(), message.author.avatarURL())
              .setColor(mainColor)
              .setTitle("**Select a divider!**")
              .setDescription(msg);
              message.channel.send(embedmsg)
              .then(async m => {
                await m.react('1️⃣');
                await m.react('2️⃣');
                await m.react('3️⃣');
                await m.react('4️⃣');
                await m.react('5️⃣');
                await m.react('6️⃣');
                await m.react('7️⃣');
                m.awaitReactions(filter, {max: 1, time: 300000, errors: ['time']})
                .then(async col => {
                  const divemoji = col.first();
                  switch (divemoji._emoji.name) {
                    case "1️⃣":
                      divider = one;
                      break;
                    case "2️⃣":
                      divider = two;
                      break;
                    case "3️⃣":
                      divider = three;
                      break;
                    case "4️⃣":
                      divider = four;
                      break;
                    case "5️⃣":
                      divider = five;
                      break;
                    case "6️⃣":
                      divider = six;
                      break;
                    case "7️⃣":
                      divider = seven;
                      break;
                  };
                  // message.channel.send(`You selected the ${divider} divider!`)
                  const roles = message.guild.roles.cache;
                  var text_func = function(x) {
                    return x.type === 'text' && x.deleted === false
                  };
                  var voice_func = function(x) {
                    return x.type === 'voice' && x.deleted === false
                  };
                  var cat_func = function(x) {
                    return x.type === 'category' && x.deleted === false
                  };
                  const text_channels = message.guild.channels.cache.filter(text_func);
                  // console.log(text_channels);
                  const voice_channels = message.guild.channels.cache.filter(voice_func);
                  const categories = message.guild.channels.cache.filter(cat_func);
                  const eta = text_channels.size + voice_channels.size + categories.size + roles.size - 1;
                  // console.log(voice_channels);
                  const e = new MessageEmbed()
                  .setAuthor(message.author.tag.toString(), message.author.avatarURL())
                  .setColor(mainColor)
                  .setTitle("**Starting Revamp!**")
                  .setDescription(`Starting the server revamp with the following settings!`)
                  .addField("Emoji:", '\\' + reaction.emoji.name, true)
                  .addField("Divider:", divider, true)
                  .addField("To be revamped:",
                  `**${roles.size - 1}** roles
                  **${text_channels.size}** text channels
                  **${voice_channels.size}** voice channels
                  **${categories.size}** categories`)
                  .addField("ETA:", `**${eta} seconds**`);
                  message.channel.send(e);
                  await revampFunc(text_channels, voice_channels, categories, roles, message.guild, reaction.emoji.name, divider, message.channel);
                  const revampEntry = new RevampSchema({
                    guild_id: message.guild.id.toString(),
                    revamped_at: Date.now(), // Revamed at; defaults to now
                    revamped_by: message.author.id.toString(), // ID of the command invoker
                    emoji: reaction.emoji.name, // Emoji used to revamp the server
                    divider: divider, // Divider used to revamp the server
                    total_text_channels: text_channels.size, // total # of text channels revamped
                    total_voice_channels: voice_channels.size, // total # of voice channels revamped
                    total_categories: categories.size,
                    total_roles: roles.size
                  });
                  revampEntry.save()
                  .then(result => console.log(result))
                  .catch(err => console.error(err));
                })
                .catch((err) => {
                  console.error(err);
                  message.channel.send(err);
                });
              });
              // const filter2 = m =>
              //   m.content.toString().toLowerCase() in ['1', '2', '3', '4', '5', '6', '7',] && m.author.id == message.author.id;
              // message.channel.awaitMessages(filter2, {max: 1, time: 300000, errors: ['time']})
              // .then(collected => {
              //   switch (collected.first().content) {
              //     case "1":
              //       divider = one;
              //       break;
              //     case "2":
              //       divider = two;
              //       break;
              //     case "3":
              //       divider = three;
              //       break;
              //     case "4":
              //       divider = four;
              //       break;
              //     case "5":
              //       divider = five;
              //       break;
              //     case "6":
              //       divider = six;
              //       break;
              //     case "7":
              //       divider = seven;
              //       break;
              //   }
              //   message.channel.send(`You selected the ${divider} divider!`);
              // })
              // .catch((err) => {
              //   console.error(err);
              //   message.channel.send(new MessageEmbed()
              //   .setColor(mainColor)
              //   .setTitle("You did not react with any option!"));
              // });
            })
            .catch((err) => {
              console.error(err);
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
      // if (!result) {
      //   continue;
      // };
    })
    .catch((err) => {
      console.error(err);
      message.channel.send('Ran into an error. Please try again ;(');
    });
    // console.log(data);
  };
};
