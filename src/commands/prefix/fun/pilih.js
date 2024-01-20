const Discord = require("discord.js");

module.exports = {
  name: "pilih",
  aliases: ["pong"],
  cooldown: 5000, //1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
  permission: [""],
  ownerOnly: false, //komutu sadece geliştiricinin kullanabilmesini istersen true olarak değiştir
  run: async (client, message, args, prefix) => {
    // execute
    const pilihan = message.content.slice((prefix + " pilih").length).trim().replace(" |", "|").replace("| ", "|");
    const pilihanPertama = pilihan.split("|")[0];
    const pilihanKedua = pilihan.split("|")[1];
    if (!pilihanPertama || !pilihanKedua) return await message.reply("Kamu melupakan salah satu pilihan")
    const hasil = [pilihanPertama, pilihanKedua][Math.floor(Math.random() * 2)];
    await message.channel.send(`🦊 ${message.member.user.username}, Pilihan ku : **${hasil}**`)
  }
};