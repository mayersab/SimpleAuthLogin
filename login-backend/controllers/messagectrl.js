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

// Controller for getting single message
const getSingleMsg = async (req, res) => {
    const {id} = req.params

    try {
        const singleMsg = await Posts.findById(id)
        res.status(200).json(singleMsg)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Controller for editing a message
const editMessage = async (req, res) => {
    const {id} = req.params

    try {
        const updatedPost = await Posts.findByIdAndUpdate({_id: id}, {...req.body}, {new: true})
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Controller for creating a message
const createMsg = async (req, res) => {
    const {message, date, postedBy} = req.body
    const poster = req.user

    try {
        const postMsg = await Posts.create({message, date, postedBy})
        res.status(200).json({postMsg})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Controller for deleting a message
const deleteMsg = async (req, res) => {
    const { id} = req.params

    try {
        const delMsg = await Posts.findByIdAndDelete(id)
        res.status(200).json(delMsg)
    } catch (error) {
        res.status(400).res.json({error: error.message})
    }
}



module.exports = {
    createMsg,
    getMsg,
    getSingleMsg,
    editMessage,
    deleteMsg
}