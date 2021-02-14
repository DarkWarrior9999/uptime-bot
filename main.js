const Discord = require("discord.js");
const client = new Discord.Client();
const configs = require("./configs.json");
const mongoose = require('mongoose');
const ping = require("node-fetch");
const fs = require("fs");

mongoose.connect(configs.bot.mongooseConnectLink, {useNewUrlParser: true, useUnifiedTopology: true});

const Database = require('./models/uptimeModel.js');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
if(err) console.error(err);
console.log(`${files.length} Genel komut yüklenecek!`);
files.forEach(f => {
let props = require(`./commands/${f}`);
client.commands.set(props.infos.name, props);
props.infos.aliases.forEach(alias => {
client.aliases.set(alias, props.infos.name);
});
});
});

client.on('message', async message => {
if(message.author.bot) return;
if(message.type == 'dm') return;
if(!message.content.startsWith(configs.bot.prefix)) return;
const args = message.content.slice(configs.bot.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
let cmd;
if (client.commands.has(command)) {
cmd = client.commands.get(command);
} else if (client.aliases.has(command)) {
cmd = client.commands.get(client.aliases.get(command));
}
if(cmd){
cmd.run(client, message, args)
}
});

setInterval(() => {
Database.find({}, function (err, link) {
if(err) console.log(err)
if(!link) return;
link.forEach(l => {
ping(l.link)
console.log(`Pinging ${l.link}`)
})
})
}, 60000)


client.login(configs.bot.token)
