const { Schema, model } = require('mongoose')

const forecastSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    dawn: String,
    dusk: String,
    "moon lit": String,
    "moon sleep": String,
    orientation: String,
    illumination: String,
})

const Forecast = model("Forecast", forecastSchema)

module.exports = Forecast