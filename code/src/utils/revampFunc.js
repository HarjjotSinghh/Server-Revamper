const { MessageEmbed, RichPresenceAssets } = require('discord.js');
const {mainColor, cross, tick} = require('../bot.js');

async function sleep (milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

const revampFunc = async function(textChannels, voiceChannels, categories, roles, guild, emoji, divider, channel) {
    // await channel.send(new )

    textChannels.forEach(async textChannel => {
        setTimeout(async function() {
            try {
                await textChannel.edit({name: `${emoji}${divider}` + textChannel.name})
            } catch (err) {
                console.error(err);
                console.log(typeof(err));
            };
        }, 1000)
        await sleep(1000);
    });
    await channel.send(
        new MessageEmbed()
        .setTitle(`${tick} Successfully revamped ${textChannels.size} text channels!`)
        .setColor(mainColor)
        );
    await sleep(1000);
    voiceChannels.forEach(async voiceChannel => {
        setTimeout(async function() {
            await voiceChannel.edit({name: `${emoji}${divider}` + voiceChannel.name})
        }, 1000)
        await sleep(1000);
    });
    await channel.send(
        new MessageEmbed()
        .setTitle(`${tick} Successfully revamped ${voiceChannels.size} voice channels!`)
        .setColor(mainColor)
        );
        await sleep(1000);
    categories.forEach(async category => {
        setTimeout(async function() {
            await category.edit({name: `${emoji}${divider}` + category.name})
        }, 1000);
        await sleep(1000);
    });;
    await channel.send(
        new MessageEmbed()
        .setTitle(`${tick} Successfully revamped ${categories.size} categories!`)
        .setColor(mainColor)
        );;
    await sleep(1000);
    roles.forEach(async role => {
        setTimeout(async function() {
            await role.edit({name: emoji + divider + role.name})
        }, 1000);
        await sleep(1000);
    });;
    await channel.send(
        new MessageEmbed()
        .setTitle(`${tick} Successfully revamped ${roles.size} roles!`)
        .setColor(mainColor)
        );;
    await sleep(1000);
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