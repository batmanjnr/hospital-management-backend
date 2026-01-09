const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    email: { required: true, type: String, unique: true },
    password:{required:true, type:String}
    
})

module.exports = mongoose.model('Doctors', userModel)