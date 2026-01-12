const express = require('express')
const router = express.Router()
const { createAppointment } = require('../controllers/user.contollers')
router.get('/', (req, res) => {
    res.render('form')
})
// GET /patient/ -> render form.ejs (existing view)

// POST /patient/appointment -> create appointment
router.post('/appointment', createAppointment)

module.exports = router
