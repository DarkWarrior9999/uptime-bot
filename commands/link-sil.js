const Discord = require('discord.js');
const configs = require("../configs.json");
const mongoose = require('mongoose');

mongoose.connect(configs.bot.mongooseConnectLink, {useNewUrlParser: true, useUnifiedTopology: true});

const Database = require('../models/uptimeModel.js');

exports.run = async (client, message, args) => {

await Database.find({}, async (err, link) => {

if(!link) return await message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`Veritabanımda hiç bir proje bulunmamaktadır!`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))

if(!args[0] || !args[0].startsWith('https://')) return await message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`Silinecek geçerli bir site linki girmelisin!`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))

if(!link.find(a => a.link === args[0])) return await message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`Veritabanımda bu link bulunmamaktadır!`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))

if(!link.filter(a => a.userID === message.author.id).find(c => c.link == args[0])) return await message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`Bu linki sen eklemediğin için silemezsin!`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))

await Database.deleteOne({ link: args[0]}, async (err, link) => { 

const embed = new Discord.MessageEmbed()
.setColor('GREEN')
.setDescription(`Başarıyla [Link](${args[0]}) veritabanımdan silindi!`)
.setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true}))
await message.channel.send(embed)
})
})
}
exports.infos = {
name: 'link-sil',
aliases: [],
}
