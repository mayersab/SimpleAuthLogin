const mongoose = require('mongoose')
const createDOMPurify = require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify = createDOMPurify(new JSDOM().window)
const {Schema} = mongoose

const messageSchema = new Schema({
    message: {type: String, required: true},
    date: {type: Date, default: Date.now},
    postedBy: {type: String}
})

messageSchema.pre('validate', function (next) {
    if (this.message) {
        dompurify.sanitize(this.message)
    }
    next()
})

module.exports = mongoose.model('Message', messageSchema)