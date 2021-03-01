const Discord = require('discord.js');
const configs = require("../configs.json");
const mongoose = require('mongoose');
const moment = require('moment');

mongoose.connect(configs.bot.mongooseConnectLink, {useNewUrlParser: true, useUnifiedTopology: true});

const Database = require('../models/uptimeModel.js');

exports.run = (client, message, args) => {
    
Database.find({}, function (err, link) {
if(err) console.log(err)
	
const say = link.length || 0
const ait = link.filter(a => a.userID === message.author.id).length || 0

const embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle(`${message.author.username}`)
.setDescription(`Sistemde toplam **${say}** bot bulunuyor! \n Bunlardan **${ait}** tanesi sana ait`)
.setFooter(`${client.user.username}`, client.user.avatarURL())
return message.channel.send(embed)
})
}
exports.infos = {
name: 'link-say',
aliases: ['linksay','link-count'],
}
