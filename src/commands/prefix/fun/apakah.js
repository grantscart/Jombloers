const discord = require("discord.js");

module.exports = {
    name: "apakah",
    aliases: ["pong"],
    cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    ownerOnly: false,//komutu sadece geliştiricinin kullanabilmesini istersen true olarak değiştir
  run: async (client, message, args, prefix) => {
        // execute
        if (args.length == 0)
      return message.reply("`Usage: pap apakah <msg>`")
        .then((msg) =>setTimeout(() => msg.delete(), 2300));

    var fortunes = [
      "Yes.",
      "sudah pasti.",
      "sudah pasti begitu.",
      "tanpa keraguan ril",
      "Sangat yes",
      "banget",
      "tidak banget",
      "ril cuy",
      "tidak yakin",
      "menurut gw yes.",
      "engga",
      "Tanya lagi nanti.",
      "Mungkin lebih baik aku ga memberitahumu",
      "Tidak bisa diprediksi sekarang.",
      "mungkin aja",
      "ga mungkin",
      "Jawaban gua no.",
      "menurut gua no.",
      "ya",
      "sulit dimengerti",
    ];
    await message.reply(
      fortunes[Math.floor(Math.random() * fortunes.length)]
    );
    
    },
};