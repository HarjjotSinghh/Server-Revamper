require('dotenv').config();
import BaseCommand from '../../utils/structures/BaseCommand';
import mongoose from 'mongoose';

export default class RevampCommand extends BaseCommand {
  constructor() {
    super('revamp', 'revamp', []);
  }

  async run(client, message, args) {
    if (args.length > 0 && args[0]  === 'server') {
      var x = message.channel.send("React with an emoji!");
      const filter = (reaction, user) => {
        return user.id === message.author.id // && reaction.message.id === x.id
      };
      message.channel.send("React with an emoji!").then((message) => {
        message.awaitReactions(filter, {max: 1, time: 120000, errors: ['time']})
        .then(collected => {
          const reaction = collected.first();
          const one = "┃";
          const two = "┇";
          const three = "┝";
          const four = "╏";
          const five = "║";
          const six = "╠";
          const seven = "▪";
          message.channel.send(`You selected the \\${reaction.emoji} Emoji!\nNow lets select a type of divider!`);
          const msg = `**${message.author.tag}** Please choose one of the following dividers for the channel names.\n`/
                      `:one: - ${reaction.emoji.name}${one}#channel-name\n`/
                      ":two: - `${reaction.emoji.name}${two}#channel-name`\n"/
                      ":three: - `${reaction.emoji.name}${three}#channel-name`\n"/
                      ":four: - `${reaction.emoji.name}${four}#channel-name`\n"/
                      ":five: - `${reaction.emoji.name}${five}#channel-name`\n"/
                      ":six: - `${reaction.emoji.name}${six}#channel-name`\n"/
                      ":seven: - `${reaction.emoji.name}${seven}`\n\n"/
                      "Please reply with the number of divider you choose below :point_down_tone3:";
          message.channel.send(`You selected the \\${reaction.emoji.name} Emoji!\nNow lets select a type of divider!`);
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