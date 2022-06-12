const Router = require('express')
const router = new Router()


router.use('/table', tableRouter)


module.exports = router