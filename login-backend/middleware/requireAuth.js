const User = require('../models/userschema')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const requireAuth = async (req, res, next) => {
    // Grab auth token from headers
    const {authorization} = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Auth token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        // Verify token 
        const {_id} = jwt.verify(token, secret)
        // Adding user property to request object. It is the '_id' field of the model
        req.user = await User.findOne({_id}).select('_id')
        next()
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

module.exports = {
    requireAuth
}