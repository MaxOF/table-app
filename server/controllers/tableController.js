const {Table} = require('../models/models')
const ApiError = require('../error/ApiError')

class tableController {
    async fetchAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        let fields;
        fields = await Table.findAndCountAll({limit, offset})
        return res.json(fields)
    }
    async create (req, res, next) {
        try {
            let {name, amount, distance} = req.body
            const tableValues = await Table.create({name, amount, distance})
            return  res.json(tableValues)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async fetchOne(req, res) {

    }
}

module.exports = new tableController()