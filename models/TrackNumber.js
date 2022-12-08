const mongoose = require('mongoose');
const Schema = mongoose.Schema

const trackNumberSchema = new Schema({
    trackNumber: {
      type: String,
      require: true,
    },
    cargo: {
        ref: 'cargo',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('trackNumber', trackNumberSchema);