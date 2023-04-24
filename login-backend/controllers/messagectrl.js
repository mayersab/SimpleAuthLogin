const Posts = require('../models/messageschema')

// Controller for getting all messages
const getMsg = async (req, res) => {
    try {
        const allMsgs = await Posts.find({})
        res.status(200).json(allMsgs)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// Controller for creating a message
const createMsg = async (req, res) => {
    const {message, date} = req.body

    try {
        const postMsg = await Posts.create({message, date})
        res.status(200).json(postMsg)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



module.exports = {
    createMsg,
    getMsg
}