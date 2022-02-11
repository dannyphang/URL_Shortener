const mongoose = require('mongoose');
const mongooseDateFormat = require('mongoose-date-format');

const urlSchema = new mongoose.Schema({
    url_code: String,
    longUrl: String,
    shortUrl: String,
    created_date: { type: Date, default: Date.now },
    url_title: String,
    visited_count: { type: Number, default: 0 },
    ip: { type: String, default: "" },
    visited_time: { type: String, default: "" },
});

urlSchema.plugin(mongooseDateFormat);

module.exports = mongoose.model('Url', urlSchema);