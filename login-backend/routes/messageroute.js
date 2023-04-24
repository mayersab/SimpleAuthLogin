const express = require('express')
const router = express.Router()
const {createMsg, getMsg} = require('../controllers/messagectrl')

router.get('/all', getMsg)
router.post('/create', createMsg)



module.exports = router