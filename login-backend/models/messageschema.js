const mongoose = require('mongoose')
const {Schema} = mongoose

const messageSchema = new Schema({
    message: {type: String, required: true},
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Message', messageSchema)