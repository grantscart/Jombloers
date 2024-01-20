
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ship')
    .setDescription('Ship two users')
    .addUserOption(option =>
      option.setName('user1')
        .setDescription('The first user to ship')
        .setRequired(true))
    .addUserOption(option =>
      option.setName('user2')
        .setDescription('The second user to ship')
        .setRequired(false)),
  cooldown: 5000,
  permission: [],
  ownerOnly: false,
  run: async (client, interaction) => {
    const user1 = interaction.options.getUser('user1');
    const user2 = interaction.options.getUser('user2') || interaction.user;

    if (user1.id === interaction.user.id) {
      return interaction.reply("Bruh, you can't ship yourself!");
    }

    const api = "https://api.popcat.xyz";
    const hearts = Math.floor(Math.random() * 100) + 0;
    const hearte = Math.floor(hearts / 10);
    let pesan = "Not a great match (≧Д≦)";

    if (hearts > 20) pesan = "Not quite a match...";
    if (hearts > 40) pesan = "Okay, it's something";
    if (hearts > 60) pesan = "Getting warmer...";
    if (hearts > 80 && hearts < 100) pesan = "Almost there...";
    if (hearts === 100) pesan = "Wow, perfect match! They should date!!";

    const str = `${"🟥".repeat(hearte)}⬛️.repeat(11 - hearte)} ${hearts}%\n${pesan}`;
    console.log(str)

    await interaction.reply({
      content: `**Love Calculator**\n${str}`,
      files: [`${api}/ship?user1=${user1.displayAvatarURL({ format: "png" })}&user2=${user2.displayAvatarURL({ format: "png" })}`],
    });
  },
};