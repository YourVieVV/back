const mongoose = require('mongoose');
const Schema = mongoose.Schema

const usersSchema = new Schema({
    login: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: false,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('users', usersSchema);