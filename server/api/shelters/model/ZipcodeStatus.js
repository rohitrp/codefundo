const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ZipcodeStatusModel = new Schema({
  dangerous: [{ type: Number }],
  warning: [{ type: Number }],
  safe: [{ type: Number }]
})

module.exports = mongoose.model('Zipcodestatus', ZipcodeStatusModel)