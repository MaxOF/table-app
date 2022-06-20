const {Table} = require('../models/models')
const ApiError = require('../error/ApiError')

class tableController {
    async fetchAll(req, res) {

        let {pageCount, page} = req.query
        debugger
        page = page || 1
        pageCount = pageCount || 10
        let limit = pageCount
        let offset = page * pageCount - pageCount
        let fields = await Table.findAndCountAll({limit, offset})

        return res.json(fields)
    }

    async create(req, res, next) {
        try {
            let {name, amount, distance} = req.body
            const tableValues = await Table.create({name, amount, distance})
            return res.json(tableValues)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new tableController()