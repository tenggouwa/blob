const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HomeInfo = new Schema({
  peers: String,
  blocks: String,
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
})
module.exports = mongoose.model('Home', HomeInfo)