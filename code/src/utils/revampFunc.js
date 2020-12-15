const { MessageEmbed, RichPresenceAssets } = require('discord.js');
const {mainColor, cross, tick} = require('../bot.js');

async function sleep (milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

revampFunc = async function(textChannels, voiceChannels, categories, roles, guild, emoji, divider, channel) {
    // await channel.send(new )
    textChannels.forEach(textChannel => {
        setTimeout(function() {
            await textChannel.edit({name: `${emoji}${divider}` + textChannel.name})
        }, 1200)
        // await sleep()
    });
    await channel.send(
        new MessageEmbed()
        .setTitle(`${tick} Successfully revamped ${textChannels.length()} text channels!`)
        .setColor(mainColor)
        );
    voiceChannels.forEach(voiceChannel => {
        setTimeout(function() {
            await voiceChannel.edit({name: `${emoji}${divider}` + voiceChannel.name})
        }, 1200)
    });
    await channel.send(
        new MessageEmbed()
        .setTitle(`${tick} Successfully revamped ${voiceChannels.length()} voice channels!`)
        .setColor(mainColor)
        );
    categories.forEach(category => {
        setTimeout(function() {
            await category.edit({name: `${emoji}${divider}` + category.name})
        }, 1200);
    });;
    await channel.send(
        new MessageEmbed()
        .setTitle(`${tick} Successfully revamped ${categories.length()} categories!`)
        .setColor(mainColor)
        );;
    roles.forEach(role => {
        setTimeout(function() {
            await role.edit({name: emoji + divider + role.name})
        }, 1200);
    });;
    await channel.send(
        new MessageEmbed()
        .setTitle(`${tick} Successfully revamped ${roles.length()} roles!`)
        .setColor(mainColor)
        );;

}
module.exports = revampFunc