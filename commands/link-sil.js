const Discord = require('discord.js');
const configs = require("../configs.json");
const mongoose = require('mongoose');

mongoose.connect(configs.bot.mongooseConnectLink, {useNewUrlParser: true, useUnifiedTopology: true});

const Database = require('../models/uptimeModel.js');

exports.run = (client, message, args) => {

Database.find({}, function (err, link) {
if(err) console.log(err)
if(!link) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`Veritabanımda hiç bir proje bulunmamaktadır!`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))
if(!args[0] || !args[0].startsWith('https://')) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`Silinecek geçerli bir site linki girmelisin!`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))
if(link.filter(a => a.userID === message.author.id).find(c => c.link !== args[0])) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`Bu linki sen eklemediğin için silemezsin!`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))
if(!link.find(a => a.link === args[0])) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`Veritabanımda bu link bulunmamaktadır!`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))
Database.deleteOne({ link: args[0]}, function (err, link) { 
const embed = new Discord.MessageEmbed()
.setColor('GREEN')
.setDescription(`Başarıyla [Link](${args[0]}) veritabanımdan silindi!`)
.setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true}))
message.channel.send(embed)
})
})
}
exports.infos = {
name: 'link-sil',
aliases: [],
}
