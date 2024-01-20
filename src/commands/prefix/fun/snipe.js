const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "snipe",
  aliases: ["pong"],
  cooldown: 5000, //1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
  permission: [""],
  ownerOnly: false, //komutu sadece geliştiricinin kullanabilmesini istersen true olarak değiştir
  run: async (client, message, args, prefix) => {
    // execute
     const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.reply("Tidak ada yang bisa di snipe!")
    const embed = new EmbedBuilder()
    .setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL({ dynamic: true, size: 1024 }) })
    .setTitle("hayoloh kau kena snipe!")
      if (msg.content) embed
    .setDescription(msg.content)
    if(msg.attachments.first())embed
    .setImage(msg.attachments.first().proxyURL)
    .setColor("#2f3136")
    .setTimestamp();
    
    message.reply({ embeds: [embed] });
   
    
  }
}