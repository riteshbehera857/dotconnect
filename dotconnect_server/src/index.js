const express = require('express')
const dotenv = require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(morgan('dev'))

app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ limit: "1000mb", extended: true }));

app.use("/current", require('./routes/current.routes.js'))
app.use("/forecast", require('./routes/forecast.routes.js'))

module.exports = app



