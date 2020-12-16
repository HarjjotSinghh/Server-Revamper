const { MessageEmbed, RichPresenceAssets } = require('discord.js');
const {mainColor, cross, tick} = require('../bot.js');
const wait = require("util").promisify(setTimeout);

async function sleep (milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  };

const revampFunc = async function(textChannels, voiceChannels, categories, roles, guild, emoji, divider, channel) {
    // await channel.send(new )

    for ( const textChannel of textChannels ) {
        try {
            // console.log(textChannel);
            await textChannel[1].edit({name: `${emoji}${divider}` + textChannel[1].name});
        } catch (err) {
            console.error(err);
            console.log(typeof(err));
        };
        await wait(1000);
    };
    await channel.send(
        new MessageEmbed()
        .setTitle(`${tick} Successfully revamped ${textChannels.size} text channels!`)
        .setColor(mainColor)
        );
    await wait(1000);
    for (const voiceChannel of voiceChannels) {
        setTimeout(async function() {
            await voiceChannel[1].edit({name: `${emoji}${divider}` + voiceChannel[1].name})
        }, 1000)
        await wait(1000);
    };
    await channel.send(
        new MessageEmbed()
        .setTitle(`${tick} Successfully revamped ${voiceChannels.size} voice channels!`)
        .setColor(mainColor)
        );
        await wait(1000);
    for ( const category of categories) {
        setTimeout(async function() {
            await category[1].edit({name: `${emoji}${divider}` + category[1].name})
        }, 1000);
        await wait(1000);
    };;
    await channel.send(
        new MessageEmbed()
        .setTitle(`${tick} Successfully revamped ${categories.size} categories!`)
        .setColor(mainColor)
        );;
    await wait(1000);
    for ( const role of roles) {
        setTimeout(async function() {
            try {
            await role[1].edit({name: emoji + divider + role[1].name})
            } catch (err) {};
        }, 1000);
        await wait(1000);
    };;
    await channel.send(
        new MessageEmbed()
        .setTitle(`${tick} Successfully revamped ${roles.size} roles!`)
        .setColor(mainColor)
        );;
    await wait(1000);
    await guild.edit({name: emoji + divider + guild.name})
    await channel.send(
        new MessageEmbed()
        .setTitle(`**${tick} Successfully revamped the full server!**`)
        .setDescription(`If you anytime want to revert these changes made, you can use the **\`s!revamp reset\`** command!`)
        .addField(name="Emoji:", name='\\' + emoji, true)
        .addField(name="Divider:", value=divider, true)
        .setColor(mainColor)
    );;
}
module.exports = revampFunc;