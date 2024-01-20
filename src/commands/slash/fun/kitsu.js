const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pap")
    .setDescription("Minta Pap Kitsu 😋"),
    // komutu geliştirmek istersen guide: https://discordjs.guide/slash-commands/advanced-creation.html
    cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    ownerOnly: false,//komutu sadece geliştiricinin kullanabilmesini istersen true olarak değiştir
   run: async (client, interaction) => {
      if (interaction.guild.id == "807798906615496714" && interaction.channel.id != "837306501914689606") return await interaction.reply({ content: 'jangan pap disini ya, papnya di <#837306501914689606> ', ephemeral: true });
        // execute
      try {
        const baseUrl = `https://${process.env.GH_PAT}@raw.githubusercontent.com/heyk1n/kitsunee/main`;
        const name = interaction.client.assets[Math.floor(Math.random() * interaction.client.assets.length)];

      const response = await fetch(`${baseUrl}/assets/${name}`)

      if (!response.ok) throw new Error("GH_OUTDATED_ASSETS");
        const blob = await response.blob();
      
      await interaction.reply({
        files: [new AttachmentBuilder(await blob.stream(), { name })]
      });
      } catch(err) {
        console.error(err);
        //if (err.message == "GH_OUTDATED_ASSETS") {
          await interaction.reply({
            ephemeral: true,
            embeds: [{
              color: 0xFFFFFF,
              author: {
                name: interaction.user.tag,
                icon_url: interaction.user.displayAvatarURL()
              },
              title: err.message == "GH_OUTDATED_ASSETS" ? "Outdated Asset" : "Failed to execute command.",
              description: err.message == "GH_OUTDATED_ASSETS" ? "Asset-asset dalam bot ini tidak valid, author bot mungkin telah melakukan perubahan pada data asset dan perlu beberapa waktu mengsinkronisasi ke dalam bot\nCoba lagi lain waktu." : `\`\`\`js\n${err.message}\`\`\``,
            }]
          })
        //}
      }
  },
};