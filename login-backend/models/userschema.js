const mongoose = require('mongoose')
const {Schema} = mongoose
const validator = require('validator')
const bcrypt = require('bcrypt')

const user = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true}
})

user.statics.signup = async function(username, email, password, confirm) {
    // Validate signup info
    if (!username || !email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Not a valid email')
    }
    if (password !== confirm) {
        throw Error('Passwords do not match')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }
    
    // Check to see if email/username is taken
    const isEmailTaken = await this.findOne({email})
    const isUserNameTaken = await this.findOne({username})

    if (isEmailTaken) {
        throw Error('Email taken')
    }
    if (isUserNameTaken) {
        throw Error('Username taken')
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10)
    const hashPW = await bcrypt.hash(password, salt)

    // Post user to database
    const createUser = await this.create({username, email, password: hashPW})
    
    return createUser
}

user.statics.login = async function(username, password) {
    // Validate login info
    if(!username || !password) {
        throw Error('All fields must be filled')
    }
    
    // Find user
    const user = await this.findOne({username})

    if (!user) {
        throw Error('Incorrect username')
    }

    // Compare passwords
    const comparePW = await bcrypt.compare(password, user.password)

    if (!comparePW) {
        throw Error('Incorrect password')
    }

    return user

}

module.exports = mongoose.model('User', user)