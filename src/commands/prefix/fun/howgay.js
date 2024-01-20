const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "howgay",
  aliases: ["pong"],
  cooldown: 5000, //1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
  permission: [""],
  ownerOnly: false, //komutu sadece geliştiricinin kullanabilmesini istersen true olarak değiştir
  run: async (client, message, args, prefix) => {
    // execute
    let member = message.mentions.users.first() || message.author

        let rng = Math.floor(Math.random() * 101);

        const howgayembed = new EmbedBuilder()
        .setTitle(`**gay machine**`)
        .setDescription(`${member.username} is ` + rng + "% Gay🌈")
        .setColor("#2f3136")

        message.channel.send({ embeds: [howgayembed] });
    },
};
