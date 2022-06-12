const Router = require('express')
const router = new Router()
const tableController = require('./../controllers/tableController')


router.get('/', tableController.fetchAll)
router.post('/', tableController.create)


module.exports = router