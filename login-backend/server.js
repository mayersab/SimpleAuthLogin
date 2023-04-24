require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const messages = require('./routes/messageroute')

const uri = process.env.URI
const secret = process.env.SECRET
const port = process.env.PORT


const app = express()

// To parse req.body
app.use(express.json())
app.use('/messages', messages)


mongoose.connect(uri)
.then(() => {
    app.listen(port, () => {
        console.log(`Connected and listening on port ${port}`)
    })
})
.catch((error) => {
    console.log(error)
})