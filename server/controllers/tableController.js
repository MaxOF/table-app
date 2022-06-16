const {Table} = require('../models/models')
const ApiError = require('../error/ApiError')

class tableController {
    async fetchAll(req, res) {

        let {pageCount, page, sortValues} = req.query
        debugger
        page = page || 1
        pageCount = pageCount || 10
        let limit = pageCount
        let offset = page * pageCount - pageCount
        let fields = await Table.findAndCountAll({limit, offset})
        // if(sortValues) {
        //     fields = await Table.findAll({
        //         group: 'name'
        //     })
        // }

        sortValues === '0name' ? fields = await Table.findAndCountAll({order: [['name', 'DESC']], limit, offset}) : ''
        sortValues === '1name' ? fields = await Table.findAndCountAll({order: [['name', 'ASC']], limit, offset}) : ''
        sortValues === '0amount' ? fields = await Table.findAndCountAll({order: [['amount', 'DESC']], limit, offset}) : ''
        sortValues === '1amount' ? fields = await Table.findAndCountAll({order: [['amount', 'ASC']], limit, offset}) : ''
        sortValues === '0distance' ? fields = await Table.findAndCountAll({order: [['distance', 'DESC']], limit, offset}) : ''
        sortValues === '1distance' ? fields = await Table.findAndCountAll({order: [['distance', 'ASC']], limit, offset}) : ''

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