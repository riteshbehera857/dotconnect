const router = require('express').Router()
const { createCurrent } = require('../controllers/current.controller.js')

router.route('/').post(createCurrent)

module.exports = router