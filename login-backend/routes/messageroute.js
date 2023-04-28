const express = require('express')
const router = express.Router()
const {createMsg, getMsg} = require('../controllers/messagectrl')
const {requireAuth} = require('../middleware/requireAuth')


router.use('/create', requireAuth )
router.get('/all', getMsg)
router.post('/create', createMsg)



module.exports = router