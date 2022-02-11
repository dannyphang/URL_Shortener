const mongoose = require('mongoose');

const geolocation = new mongoose.Schema({
    visited_time: Date,
    ip: String,
    country: String,
})

module.exports = mongoose.model('geolocation', geolocation);