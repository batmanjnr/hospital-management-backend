const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    firstName: { required: true, type: String },
    phoneNumber: { required: true, type: String },
    issue: { required: true, type: String },
    department: {
        type: String, required: true,
        enum: [
            "Others",
            "Cardiovascular Surgery",
            "Neuroscience",
            "Oncology",
            "Modern Pediatrics"
        ]
    }
}, { timestamps: true })

module.exports = mongoose.model('Patient Details', userModel)