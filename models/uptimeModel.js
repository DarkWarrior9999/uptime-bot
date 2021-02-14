const mongoose = require('mongoose');

const uptimeSchema = mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,
userID: String,
link: String,
date: Date
});
  
module.exports = mongoose.model("Uptime", uptimeSchema);
