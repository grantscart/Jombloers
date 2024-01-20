const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "help",
    aliases: ["pong"],
    cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    ownerOnly: false,//komutu sadece geliştiricinin kullanabilmesini istersen true olarak değiştir
run: async (client, message, args, prefix) => {
    const commands = client.prefix_commands.map(command => `${command.config.name}`);

    return message.reply(
      {
        embeds: [
          new EmbedBuilder()
            .setAuthor(
              {
                name: client.user.tag,
                iconURL: client.user.displayAvatarURL(
                  {
                    dynamic: true
                  }
                )
              }
            )
            .setDescription(commands.join(', '))
            .setFooter(
              {
                text: `→ Use ${prefix} and type the command name for using the command.`
              }
            )
            .setColor("#2f3136")
        ]
      }
    );

  },
};