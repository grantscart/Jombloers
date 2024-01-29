require("dotenv").config();
const { Client, Collection, Events, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.AutoModerationExecution, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
  partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember],
  shards: "auto"
});
const config = require("./src/config.js");
const { readdirSync } = require("node:fs");
const moment = require("moment");
const fetch = require("node-fetch")
const axios = require('axios');
const mongoose = require('mongoose');
const autoresSchema = require('./schemas/autores')
const prefix = 'k'
const { handleErrors } = require('./src/Handlers/errorHandler.js');
const webhookUrl = config.ERR_WEB;

let token = config.token;

client.commandAliases = new Collection();
client.commands = new Collection();
client.slashCommands = new Collection();
client.slashDatas = [];
client.snipes = new Map()
client.on('messageDelete', function(message){
if (message.partial || message.author.partial) return;
  const { content, author, attachments } = message;
  client.snipes.set(message.channelId, { content, author, attachments })
})


function log(message) {
  console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${message}`);

};
client.log = log

mongoose.connect(process.env.mongo, {useNewUrlParser: true, useUnifiedTopology: true});

handleErrors(client, webhookUrl);


// Command Handler
readdirSync("./src/commands/prefix").forEach(async (folder) => {
readdirSync(`./src/commands/prefix/${folder}`).forEach(async (file) => {
  const command = await require(`./src/commands/prefix/${folder}/${file}`);
  if (command) {
    client.commands.set(command.name, command);
    if (command.aliases && Array.isArray(command.aliases)) {
      command.aliases.forEach((alias) => {
        client.commandAliases.set(alias, command.name);
      });
    }
  }
})
});

// Slash Command Handler
const slashcommands = [];
readdirSync("./src/commands/slash").forEach(async (folder) => {
readdirSync(`./src/commands/slash/${folder}`).forEach(async (file) => {
  const command = await require(`./src/commands/slash/${folder}/${file}`);
  client.slashDatas.push(command.data.toJSON());
  client.slashCommands.set(command.data.name, command);
})
});

// Event Handler
readdirSync("./src/events").forEach(async (file) => {
  const event = await require(`./src/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
});

// Process Listeners
process.on("unhandledRejection", (e) => {
  console.log(e);
});
process.on("uncaughtException", (e) => {
  console.log(e);
});
process.on("uncaughtExceptionMonitor", (e) => {
  console.log(e);
});


client.login(token);


client  
	.on('messageCreate', async (message) => {
        if(message.author.bot) return;
        var data = await autoresSchema.find({guildId: message.guild.id})
        if(data) {
            const f = data.find(c => c.msg.toLowerCase() === message.content.toLowerCase()) 
            if(f) {
            return message.reply(f.res)
            }
        } 
		if(message.content.startsWith(prefix + 'add')) {
            if(!message.member.permissions.has('ManageGuild')) return message.reply('You dont have permissions to run this command.')
            message.reply('**Hi, Please send msg thats you want 🦊, `Kitsu`**')
            const filter = m => m.author.id === message.author.id;
            message.channel.awaitMessages({ filter, max: 1 }).then(c => {
                message.reply('**Now please send the response, `😆`**')
                message.channel.awaitMessages({ filter, max: 1 }).then(async(d) => {
                    const id = idgen()
                    message.reply({ embeds: [new EmbedBuilder()
                    .setTitle('🦊 Auto responsess')
                    .setColor("#2f3136")
                    .setDescription(`**\`\`\`>  msg: ${c.first().content}\n>  res: ${d.first().content}\n>  Id: ${id} \`\`\`**`)] });
                    await autoresSchema.create({ guildId: message.guild.id, msg: c.first().content, res: d.first().content, makeId: idgen() });
                })
            })
        }
        if(message.content.startsWith(prefix + 'list')) {
            if(!message.member.permissions.has('ManageGuild')) return message.reply('You dont have permissions to run this command.')

            if(data) {
                console.log(data)
                message.reply({ embeds: [new EmbedBuilder()
                .setTitle('🦊 Auto responsess')
                .setColor("#2f3136")
                .setDescription(data.map((d, index) => `**#${index+ 1}\n>  Message: ${d.msg}\n>  Response: ${d.res} \n>  Id: ${d.makeId}**`).join("\n"))
                ] })
            }
        }
        if(message.content.startsWith(prefix + 'edit')) {
            if(!message.member.permissions.has('ManageGuild')) return message.reply('You dont have permissions to run this command.')
            message.reply('Please send document ID (Auto response id)')
            const filter = m => m.author.id === message.author.id;
            message.channel.awaitMessages({ filter, max: 1 }).then(async(c) => {
                var datas = await autoresSchema.findOne({guildId: message.guild.id, makeId: c.first().content})
                if(!datas) return message.reply('I can\'t find anything')
                message.reply('Please send new msg')
                message.channel.awaitMessages((msg) => msg.author.id === message.author.id, {max: 1}).then((d) => {
                    message.reply('Please send new Response')
                    message.channel.awaitMessages((msg) => msg.author.id === message.author.id, {max: 1}).then(async(e) => {
                        datas.msg = d.first().content
                        datas.res = e.first().content
                        await datas.save()
                                             
                          message.reply('Done thats save')
                    })
                })
            })
        }
        if(message.content.startsWith(prefix + 'remove')) {
            if(!message.member.permissions.has('ManageGuild')) return message.reply('You dont have permissions to run this command.')
            message.reply('Please send document ID (Auto response id)')
            const filter = m => m.author.id === message.author.id;
            message.channel.awaitMessages({ filter, max: 1 }).then(async(c) => {
                const datas =  await autoresSchema.findOne({guildId: message.guild.id, makeId: c.first().content})
                if(!datas) return message.reply('I cant find the document id')
                datas.deleteOne().then(() => message.reply('Done has been deleted'))
            })
        }
	}); 

function idgen() {
    return  `_${Math.random().toString(36).substr(2, 5)}_${Math.random().toString(36).substr(2, 5)}`
}
