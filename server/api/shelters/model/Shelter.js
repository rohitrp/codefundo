const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var moment = require('moment-timezone');

const shelterModel = new Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    lngLat: { type: String, required: true },
    zipcode: { type: String, required: true },
    propertyType: { type: String, },
    infantFriendly: { type: String },
    elderFriendly: { type: String },
    official: { type: Boolean, default: false },
    lastUpdated: { type: Date },
    family: { type: String },
    familyAgeMin: { type: String },
    familyAgeMax: { type: String }
});

shelterModel.pre('save', function(next) {
    this.lastUpdated = moment();
    next();
});

module.exports = mongoose.model('Shelter', shelterModel);