const Discord = require('discord.js');
const configs = require("../configs.json");
const moment = require('moment');
require('moment-duration-format')
const mongoose = require('mongoose');

mongoose.connect(configs.bot.mongooseConnectLink, {useNewUrlParser: true, useUnifiedTopology: true});

const Database = require('../models/uptimeModel.js');

exports.run = (client, message, args) => {

let months = {"01": "Ocak","02": "Şubat","03": "Mart","04": "Nisan","05": "Mayıs","06": "Haziran","07": "Temmuz","08": "Ağustos","09": "Eylül","10": "Ekim","11": "Kasım","12": "Aralık"};

Database.find({}, function (err, link) {
if(err) console.log(err)

let filter = link.filter(k => k.userID == message.author.id)
let map = filter.map(r => `[Linke Git](${r.link}) | **${moment(r.date).format('DD')} ${months[moment(r.date).format('MM')]} ${moment(r.date).format('YYYY')}**`).join('\n')

let list;
if(!filter) list = `Veritabanamımda sana ait link bulamadım!`
if(filter) list = `${map}`
if(filter.length == 0) list = `Veritabanamımda sana ait link bulamadım!`

const embed = new Discord.MessageEmbed()
.setColor('GREEN')
.setTitle(`${message.author.username}`)
.setDescription(`${list}`)
.setFooter(`${client.user.username}`, client.user.avatarURL())
message.channel.send(embed)
});
}
exports.infos = {
name: 'link-list',
aliases: [],
}
