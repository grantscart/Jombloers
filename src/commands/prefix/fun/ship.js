const block = "⬛";
const heart = "🟥";
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "ship",
  aliases: ["pong"],
  cooldown: 5000, //1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
  permission: [""],
  ownerOnly: false, //komutu sadece geliştiricinin kullanabilmesini istersen true olarak değiştir
  run: async (client, message, args, prefix) => {
    // execute
     const api = "https://api.popcat.xyz";
 const user = message.mentions.users.first();
    if (!user) return message.channel.send(`tolong tag siapa yang mau kau ship`)
     if(user.id === message.author.id) {
     return message.reply("Bruh kau ingin menggunakan lc buat kau sendiri")
     }
if (message.mentions.users.size < 2) {
    let loveEmbed = new EmbedBuilder()
        .setColor(0xDD2E44)
        .setTitle('Shipping...')
        .setDescription(`Shipped ${message.author} and ${user}!`)
        .setImage(`${api}/ship?user1=${message.author.displayAvatarURL({ extension: "png" })}&user2=${user.displayAvatarURL({ extension: "png" })}`)
        .setFields({ name: `**Ship Meter**`, value: ship() })
        
   return message.channel.send({ content: `**Ship Meter**\n${ship()}`, files: [`${api}/ship?user1=${message.author.displayAvatarURL({ extension: "png" })}&user2=${user.displayAvatarURL({ extension: "png" })}`] })
} else if (message.mentions.users.size > 1) {
let luv = new EmbedBuilder()
        .setColor(0xDD2E44)
        .setTitle('Ship')
        .setDescription(`Shipped ${message.mentions.users.first()} and ${message.mentions.users.last()}!`)
        .setImage(`${api}/ship?user1=${message.mentions.users.first().displayAvatarURL({ extension: "png" })}&user2=${message.mentions.users.last().displayAvatarURL({ extension: "png" })}`)
        .setFields({ name: `**Love Calculator**`, value: ship() })
    message.channel.send({ content: `**Love Calculator**\n${ship()}`, files: [`${api}/ship?user1=${message.mentions.users.first().displayAvatarURL({ extension: "png" })}&user2=${message.mentions.users.last().displayAvatarURL({ extension: "png" })}`] })
}
}
}

function ship() {
  let pesan = "Ga cocok nih( ≧Д≦)";
    const hearts = Math.floor(Math.random() * 100) + 0;
  if (hearts > 20) pesan = "Yaah, Kurang cocok..";
  if (hearts > 40) pesan = "Lumayan lah";
  if (hearts > 60) pesan = "Hampir..";
  if (hearts > 80 && hearts < 100) pesan = "Dikiit lagii..";
  if (hearts === 100) pesan = "Waah, cocok banget, gaskeun jadian!!";
    const hearte = (hearts/10)
  
    const str = `${heart.repeat(hearte)}${block.repeat(11 - hearte)} ${hearts}%\n${pesan}`;
    return str;
}