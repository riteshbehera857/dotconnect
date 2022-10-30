const Current = require("../models/current.model")

const createCurrent = async (req, res, next) => {
    try {
        if (!req.body) return new Error("Please Insert all the required fields")
        const current = await Current.create({
            ...req.body
        })
        res.status(201).json({
            status: 'success',
            error: 'false',
            data: {
                current
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createCurrent
}