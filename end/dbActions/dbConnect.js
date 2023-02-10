const mongoose = require('mongoose');
const { dbUrl } = require('../config/DbUrI');

const dbConnect = async () => {
  await mongoose.connect(dbUrl, (err) => {
    if (err) {
      console.log(`Mongoose Connect Error, ${err}`)
    } else {
      console.log("Mongoose Connected");
    }
  });
  mongoose.set('strictQuery', false)
}


module.exports = {
  dbConnect
}