const mongoose = require('mongoose');
const Schema = mongoose.Schema

const calculationSchema = new Schema({
    from: {
      type: String,
      require: true,
    },
    to: {
      type: String,
      require: true,
    },
    weight: {
      type: Number,
      require: true,
    },
    volume: {
      type: Number,
      require: true,
    }
})

module.exports = mongoose.model('calculation', calculationSchema);