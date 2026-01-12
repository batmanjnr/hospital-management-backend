const userModel = require('../models/user.models')

const createAppointment = (req, res) => {
  const { firstName, phoneNumber, issue, department } = req.body || {}

  // Validation
  // const errors = []
  // if (!firstName || !firstName.toString().trim()) errors.push('firstName is required')
  // if (!phoneNumber || !phoneNumber.toString().trim()) errors.push('phoneNumber is required')
  // if (!issue || !issue.toString().trim()) errors.push('issue is required')
  // if (!department || !department.toString().trim()) errors.push('department is required')
  // if (errors.length) return res.status(400).json({ errors })

  // Create model with an object
  const patient = new userModel({
    firstName: firstName.trim(),
    phoneNumber: phoneNumber.trim(),
    issue: issue.trim(),
    department: department.trim()
  })

  patient.save()
    .then((saved) => {
      return res.status(201).json({ message: 'Appointment saved', patient: saved })
    })
    .catch((err) => {
      console.error('save patient error:', err)
      return res.status(500).json({ error: 'Internal server error' })
    })
}

module.exports = { createAppointment }