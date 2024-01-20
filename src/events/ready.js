const { ActivityType, Events } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    
const baseUrl = `https://raw.githubusercontent.com/inik1n/kitsunee/main`;
const assetsRaw = await fetch(`${baseUrl}/assets.json`, {
  headers: {
    'Authorization': `Bearer ${process.env.GH_PAT}`
  }
});
client.assets = await assetsRaw.json();
    
    const rest = new REST({ version: "10" }).setToken(client.token);
    const activities = [`Developed by Zarco.`, `${client.user.username}`];
    let nowActivity = 0;

    const botPresence = () => {
      client.user.presence.set({
        activities: [{ name: `${activities[nowActivity++ % activities.length]}`, type: ActivityType.Listening }],
      });
      setTimeout(botPresence, 300000);
    }

    botPresence();

    client.log(`${client.user.username} Bot Telah Aktif!`);

    try {
      await rest.put(Routes.applicationCommands(client.user.id), {
        body: client.slashDatas,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
