
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gombal')
    .setDescription('kirimkan gombalan untuk dia')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to send the pickup line to')
        .setRequired(true)),
  cooldown: 5000,
  permission: [],
  ownerOnly: false,
  run: async (client, interaction) => {
    const targetUser = interaction.options.getUser('target');

    if (!targetUser) {
      return interaction.reply("tag orang tersebut untuk memberikan gombalan.");
    }

    const listGombalan = [
        "Kalau aku jadi wakil rakyat aku pasti gagal deh. Gimana mau mikirin rakyat, kalau yang selalu ada di pikiranku hanyalah kamu.",
"Mungkin aku kiper terburuk sedunia, membiarkan kamu membobol gawang berkali-kali dengan cintamu",
"Balon kalau diisi angin semakin lama semakin ringan. Hatiku kalau diisi kamu semakin lama semakin ingin ke pelaminan.",
"Hari minggu itu weekend, tapi kalau cinta aku ke kamu tuh will never end.",
"Manisnya tebu tak akan bisa mengalahkan manisnya dirimu.",
" Cintaku padamu layaknya jumlah pasir di bumi, tak terhingga.",
"Ratusan, bahkan ribuan penghapus udah aku gunain. Cuma nggak ada yang bisa menghapus kamu dari pikiranku",
"Cuma ada 3 hal yang gak bisa aku hitung di dunia ini, jumlah bintang di langit, ikan di laut, dan rasa cinta aku ke kamu",
"Kamu tahu gak rasa sayang aku ke kamu itu kayak kuku. Walaupun dipotong, tetap bakal tumbuh terus.",
"Kamu itu kayak garam di laut, gak keliatan tapi akan selalu ada untuk selamanya.",
"Aku sebenarnya cuma ingin hidup cukup. Iya, cukup lihat kamu senyum untuk aku setiap hari.",
"Aku kasih tahu ya, orang kayak kamu jangan pergi ke taman bunga. Soalnya takut bunganya layu karena minder kalah cantik sama kamu.",
"Kamu sekali-kali coba, deh, rasain jadi aku. Kamu rasain gimana sayangnya aku ke kamu.",
"Di Bogor ada gerobak bisa terbang. Tapi itu gak penting, yang penting itu kamu tahu kalau aku sayang banget sama kamu",
"Aku lagi capek kerja seharian, nih, tapi kok aku gak ada capek-capeknya ngangenin kamu ya?",
"Pelukis hobinya melukis pemandangan, kalau aku hobinya melukis masa depan sama kamu.",
"Sedalam-dalamnya Palung Mariana, lebih dalam perasaan cintaku padamu.",
"Kamu tau nggak kenapa kalau aku menghafal sesuatu lihatnya ke atas? Soalnya kalau merem langsung kebanyang wajahmu.",
"Kamu tahu kenapa donat bolong tengahnya? Karena kalo utuh namanya bukan donat tetapi cintaku kepadamu.",
"Mereka bilang kamu hanya jatuh cinta sekali, tapi itu tidak benar. Setiap kali aku melihatmu, aku selalu jatuh cinta.",
"Dalam benak orang bijak ada ide, solusi dan alasan. Dalam benak para ahli ada formula kimia, teori dan rumus. Di dalam benakku, hanya ada kamu!",
"Di atas langit masih ada langit! Di bawah langit masih ada aku yang tulus mencintaimu.",
"Ada tiga hal di dunia ini yang tidak bisa kuhitung, jumlah bintang di langit, ikan di laut, dan cintaku padamu.",
" Main ular tangga sekarang sudah nggak zaman. Tahu nggak kenapa kayak gitu? Karena sekarang zamannya membangun rumah tangga bersamamu.",
"Memang sih di rumah sakit banyak sekali tabung oksigen, tapi pas aku sakit sesak, aku bilang sama susternya, aku hanya butuh kamu, soalnya kamu adalah oksigen aku",
" Dari banyaknya menu di setiap restoran yang kita datangi, cuma 1 menu yang aku suka, yaitu menua bersamamu",
"I don't know about my future, but when I look into your eyes, then I know my future is you."
    ];

    await interaction.reply(`${targetUser.toString()}, nih gombalan dari ${interaction.user.tag}\n\n${listGombalan[Math.floor(Math.random() * listGombalan.length)]}`);
  },
};