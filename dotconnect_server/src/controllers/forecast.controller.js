const Forecast = require("../models/forecast.model")

const createForecast = async (req, res, next) => {
    try {
        if (!req.body) return new Error("Please Insert all the required fields")
        const forecast = await Forecast.create({
            ...req.body
        })
        res.status(201).json({
            status: 'success',
            error: 'false',
            data: {
                forecast
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createForecast
}