const router = require('express').Router()
const { createForecast } = require('../controllers/forecast.controller.js')

router.route('/').post(createForecast)

module.exports = router