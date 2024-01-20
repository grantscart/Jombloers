
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
    .setName('snipe')
    .setDescription('Retrieve the last deleted message of the channel'),
    run: async (client, interaction) => {
        const msg = client.snipes.get(interaction.channel.id);
        if (!msg) return await interaction.reply({ content: `I cant find any deleted messages!`, ephemeral: true });

        const ID = msg.author.id;
        const member = interaction.guild.members.cache.get(ID);
        const URL = member.displayAvatarURL();

        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle(`Messaged Sniped! (${member.user.tag})`)
        .setDescription(`${msg.content}`)
        .setFooter({ text: `Member ID ${ID}`, iconURL: `${URL}`  });

        if (msg.image) embed.setImage(msg.image)
        await interaction.reply({ embeds: [embed] });
    }
}