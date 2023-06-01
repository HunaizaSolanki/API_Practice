const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const studentRoute = require('./api/routes/student')
const userRoute = require('./api/routes/user')

mongoose.connect('mongodb+srv://hunaizariaz10:Journalpie123@cluster0.wnsrsne.mongodb.net/?retryWrites=true&w=majority')

mongoose.connection.on('error', err => {
    console.log('Connection Failed');
})

mongoose.connection.on('connected', con => {
    console.log('Connection Successful');
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/student',studentRoute) //End point (localhost:3000/student)
app.use('/user', userRoute)

app.use((req, res, next) => {
    res.status(404).json({
        message: "Bad Request"
    })
})

module.exports = app;