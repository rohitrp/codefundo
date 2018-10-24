'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const userModel = new Schema({
//     email: { type: String, required: true, index: { unique: true } },
//     password: { type: String, required: true },
//     admin: { type: Boolean, required: true },
//     active: { type: Boolean }
// });

const userModel = new Schema({
    email: { type: String, required: true },
    // first_name: { type: String, required: true },
    // last_name: { type: String, required: true },
    password: { type: String, required: true }
});
module.exports = mongoose.model('User', userModel);