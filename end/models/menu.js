const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuSchema = new Schema({
  isDeleted: Boolean,
  url: String,
  name: String,
}, { timestamps: true })
module.exports = mongoose.model('menu', menuSchema)