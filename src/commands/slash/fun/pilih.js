
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pilih')
    .setDescription('Make a choice between two options')
    .addStringOption(option =>
      option.setName('options')
        .setDescription('Options to choose from, separated by "|". Example: Option1 | Option2')
        .setRequired(true)),
  cooldown: 5000,
  permission: [],
  ownerOnly: false,
  run: async (client, interaction) => {
    const options = interaction.options.getString('options');
    const [option1, option2] = options.split('|').map(option => option.trim());

    if (!option1 || !option2) {
      return interaction.reply("You forgot one of the options");
    }

    const result = [option1, option2][Math.floor(Math.random() * 2)];

    await interaction.reply(`🦊 ${interaction.user.username}, My choice: **${result}**`);
  },
};