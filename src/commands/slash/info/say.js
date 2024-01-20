const {PermissionFlagsBits,EmbedBuilder,ActionRowBuilder,ButtonBuilder, ButtonStyle,SlashCommandBuilder, ComponentType
  } = require('discord.js');

  
  module.exports = {
    ownerOnly: true,
    data: new SlashCommandBuilder()
    .setName('say')
    .setDMPermission(false)
    .setDescription( 'Broadcasts the message your message in channel')
    .addStringOption((option) => option.setName('type').setDescription('Select the type of message you want').setRequired(true).addChoices({name: 'Text', value: `Text`},{name: `Embed`, value: `Embed`}))
    .addStringOption((option) => option.setName(`message`).setDescription(`The message to be broadcast`).setRequired(true))
    .addAttachmentOption((option)=> option.setRequired(false).setName("image").setDescription("The image to dither")),
    
  
    run: async (client, interaction) => {

        const type = interaction.options.getString(`type`)  
        const message = interaction.options.getString(`message`);
        const attachment = interaction.options.getAttachment("image")

        let name = null;
        let url = null;
        let proxyURL = null;

 if (attachment !== null) {
 name = attachment.name
 url = attachment.url
 proxyURL = attachment.proxyURL
 }

       if (attachment == null) {
        url = ''
       }

        if (type == 'Embed') {

        let embed = null;

        if (attachment == null) {
        
         embed = new EmbedBuilder()
        .setDescription(message)
        .setColor(`Green`)
        }

        if (attachment !== null) {
            embed = new EmbedBuilder()
            .setDescription(message)
            .setColor(`Green`)
            .setImage(url);
        }
        await interaction.channel.send({embeds: [embed]})
        }

        if (type == 'Text') {
            await interaction.channel.send({content:`${message} \n\n${url}`})
        }
        await interaction.reply({content: `Succesfully broadcasted your message in the channel!`, ephemeral:true})
    }}