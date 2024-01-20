const { SlashCommandBuilder, EmbedBuilder, EmbedAssertions, } = require('discord.js');



const gifOptions = {

    slap: [

        'https://media.tenor.com/eU5H6GbVjrcAAAAC/slap-jjk.gif',

        'https://media.tenor.com/CAesvxP0KyEAAAAd/shinobu-kocho-giyuu-tomioka.gif',

        'https://media.tenor.com/V2aQ-PeFwwUAAAAd/slap.gif',

        'https://media.tenor.com/Irk80uToJA0AAAAC/slap-anime.gif',

        'https://media.tenor.com/V2aQ-PeFwwUAAAAd/slap.gif'

    ],

    cry: [

        'https://media.tenor.com/8d58796bcf6807aa9b5870d9e6c6d80d/tenor.gif',

        'https://media.tenor.com/0dc4e526831e065d5c042d79e43a92f7/tenor.gif',

        'https://media.tenor.com/0a524c99d8339b31aee9e1e09ffdb0d3/tenor.gif',

        'https://media.tenor.com/9a1e90c155ac3e5c75c94fda978b9e9c/tenor.gif',

        'https://media.tenor.com/3ccf19f8ac8ef4b5db93dd06e84874f4/tenor.gif'

    ],

    blush: [

        'https://media.tenor.com/4f301b1af1e446e110b2289ab6d354fd/tenor.gif',

        'https://media.tenor.com/7c125f8bc8a67d2f6b1007b659db394d/tenor.gif',

        'https://media.tenor.com/ed9f7a245038cd4b29d60b7f03b942a3/tenor.gif',

        'https://media.tenor.com/1c2b6f36f6bb17199f2e4d8b7b4db299/tenor.gif',

        'https://media.tenor.com/ea2f31a7c5e1088a5a6512f88ae271c1/tenor.gif'

    ],

    kick: [

        'https://media.tenor.com/fGSyYSbD0-4AAAAC/mikey-mickey.gif',

        'https://media.tenor.com/4zwRLrLMGm8AAAAC/chifuyu-chifuyu-kick.gif',

        'https://media.tenor.com/b6g4NyJ9e08AAAAC/mazinger-z-devila-x1.gif',

        'https://media.tenor.com/xZtJVhHJGWEAAAAC/kick-kicking.gif',

        'https://media.tenor.com/g716fdX69mQAAAAd/the-god-of-highschool-anime.gif'



    ],

    kiss: [

        'https://media.tenor.com/_vI2MlAN-EUAAAAC/anime-couple-kiss-cheek.gif',

        'https://media.tenor.com/OjcDtiEDUvMAAAAC/friendly-kiss.gif',

        'https://media.tenor.com/4Z5a0xqgXAUAAAAC/anime-kiss.gif',

        'https://media.tenor.com/zfY6muV_5OoAAAAC/cr-curiositly.gif',

        'https://media.tenor.com/Cchd6VOMDIwAAAAM/forehead-forehead-kiss.gif'

    ],

    hug: [

        'https://media.tenor.com/0tqXzdcrGeoAAAAC/oi.gif',

        'https://media.tenor.com/cGFtCNuJE6sAAAAC/anime-aesthetic.gif',

        'https://media.tenor.com/kCZjTqCKiggAAAAC/hug.gif',

        'https://media.tenor.com/rTKIBe2qtxsAAAAC/anime-couples.gif',

        'https://media.tenor.com/gqC-f_diA9EAAAAC/jujutsu-kaisen-hug.gif'

    ]

};



module.exports = {

    data: new SlashCommandBuilder()

        .setName('anime-intereaction')

        .setDescription('😊Interact with someone using an anime gif!')

        .addUserOption(option => option.setName('user').setDescription('The user to interact with').setRequired(true))

        .addStringOption(option => option.setName('action').setDescription('The interaction to perform').setRequired(true)

            .addChoices(

                { name: 'Slap', value: 'slap' },

                { name: 'Kick', value: 'kick' },

                { name: 'Kiss', value: 'kiss' },

                { name: 'Hug', value: 'hug' },

            )

        ),



      run: async (client, interaction) => {
  
        const sender = interaction.user;

        const receiver = interaction.options.getUser('user');

        const action = interaction.options.getString('action');



        if (!receiver) {

            return interaction.reply({

                content: 'Please mention a valid user to interact with!',

                ephemeral: true

            });

        }



        if (!gifOptions[action]) {

            return interaction.reply({

                content: 'Invalid action. Please choose a valid interaction.',

                ephemeral: true

            });

        }



        const randomGif = gifOptions[action][Math.floor(Math.random() * gifOptions[action].length)];



        const embed = new EmbedBuilder()

            .setColor('#FFFFFF') // White color in hexadecimal format

            .setDescription(`${sender} ${action}ed ${receiver}!`)

            .setImage(randomGif)

            .setTimestamp();



        interaction.reply({ embeds: [embed] });

    },

};

