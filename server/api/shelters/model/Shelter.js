const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shelterModel = new Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    lngLat: { type: String, required: true }
});
module.exports = mongoose.model('Shelter', shelterModel);