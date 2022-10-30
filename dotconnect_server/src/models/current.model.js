const { Schema, model } = require("mongoose");

const currentSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    town: String,
    state: String,
    nation: String,
    latitude: String,
    longitude: String,
    timezone: String,
    time: String
})

const Current = model("Current", currentSchema)

module.exports = Current