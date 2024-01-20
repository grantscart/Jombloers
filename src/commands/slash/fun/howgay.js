
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('howgay')
    .setDescription('Check the gay percentage of a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to check')
        .setRequired(false)),
  cooldown: 5000,
  permission: [],
  ownerOnly: false,
 run: async (client, interaction) => {
    const member = interaction.options.getUser('user') || interaction.user;

    const rng = Math.floor(Math.random() * 101);

    await interaction.reply({
      content: `**Gay Machine**\n${member.username} is ${rng}% Gay🌈`,
      ephemeral: false, // Set to true if you want the response to be visible only to the user who used the command
    });
  },
};