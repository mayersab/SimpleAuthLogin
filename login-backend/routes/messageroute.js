const express = require('express')
const router = express.Router()
const {createMsg, getMsg, getSingleMsg, editMessage, deleteMsg} = require('../controllers/messagectrl')
const {requireAuth} = require('../middleware/requireAuth')

// Authenticated Requests
router.use('/create', requireAuth )
router.use('/edit/:id', requireAuth )
router.use('/delete/:id', requireAuth )

// Getting all messages
router.get('/all', getMsg)

// Getting a single message
router.get('/:id', getSingleMsg)

// Creating a message
router.post('/create', createMsg)

// Editing an existing message 
router.patch('/edit/:id', editMessage)

// Deleting a message
router.delete('/delete/:id', deleteMsg)





module.exports = router