const secret = process.env.SECRET
const User = require('../models/userschema')
const jwt = require('jsonwebtoken')

// Create JWT
const createToken = (_id) => {
    return jwt.sign({_id}, secret, {expiresIn: '2h'})
}

// Register User
const registerUser = async (req, res) => {
    const {username, email, password, confirm} = req.body


    try {
        const newUser = await User.signup(username, email, password, confirm)
        // If signup is successful, a token is created
        const token = createToken(newUser._id)
        res.status(200).json({username, token, userID: newUser._id})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Log in user
const loginUser = async (req, res) => {
    const {username, password} = req.body
    try {
        const loggedUser = await User.login(username, password)
        const token = createToken(loggedUser._id)
        res.status(200).json({username, token, userID: loggedUser._id})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    registerUser,
    loginUser
}