//Create schema (Structure)
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    gender: String,
    age: Number,
    phoneNumber: Number,
    userType: String
},{
    collection: 'Users' // Specify the new collection name here
  })

module.exports = mongoose.model('Register', userSchema)