const mongoose = require('mongoose');
const { Schema } = mongoose

const csvDataSchema = new mongoose.Schema({
    Series_reference: { type: String, required: true },
    Period: { type: Number, required: true },
    Data_value: { type: Number, unique: true },
    Suppressed: String,
    STATUS: String,
    UNITS: String,
    Magnitude: Number,
    Subject: String,
    Group: String,
    Series_title_1: String,
    Series_title_2: String,
    Series_title_3: String,
});

const CsvData = mongoose.model('CsvData', csvDataSchema);

module.exports = CsvData;