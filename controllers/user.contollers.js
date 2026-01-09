const nodemailer = require('nodemailer')
const userModel = require('../models/user.models')


const createAppointment = (req, res) => {
  const { firstName, lastName, email, phoneNumber, homeAddress } = req.body || {}

  const fName = (firstName || '').trim()
  const lName = (lastName || '').trim()
  const mail = (email || '').trim()
  const phone = (phoneNumber || '').trim()
  const address = (homeAddress || '').trim()

  const errors = []
  if (!fName) errors.push('firstName is required')
  if (!lName) errors.push('lastName is required')
  if (!mail) errors.push('email is required')
  if (!phone) errors.push('phoneNumber is required')
  if (!address) errors.push('homeAddress is required')
  if (errors.length) return res.status(400).json({ errors })


  const patient = new userModel({ firstName: fName, lastName: lName, email: mail, phoneNumber: phone, homeAddress: address })

  patient.save()
    .then((saved) => {
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.email,
          pass: process.env.pass
        }
      })

      const mailOption = {
        from: 'MainSpringHospital@gmail.com',
        to: saved.email,
        subject: 'APPOINTMENT BOOKED',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Appointment Confirmation</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden;">
          <tr>
            <td style="background-color:#2f80ed; padding:24px; text-align:center; color:#ffffff;">
              <h1 style="margin:0; font-size:24px;">Appointment Confirmed</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px; color:#333333;">
              <p style="font-size:16px; margin-top:0;">Hello <strong>${fName} ${lName}</strong>,</p>
              <p style="font-size:16px;">Thank you for booking your appointment with <strong>MainSpring Hospital</strong>. Your appointment details will be sent shortly.</p>
              <p style="font-size:14px;">Your well being is our priority🤗<br><strong>MainSpring Hospital</strong></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
      }

      transporter.sendMail(mailOption, function (error, info) {
        if (error) {
          console.error('sendMail error:', error)
          // still return success for DB save, but indicate mail failure
          return res.status(201).json({ message: 'Appointment saved', emailSent: false, mailError: error.toString(), patient: saved })
        }

        console.log('mail sent:', info && info.response)
        return res.status(201).json({ message: 'Appointment saved', emailSent: true, info, patient: saved })
      })
    })
    .catch((err) => {
      // handle duplicate email error
      if (err && err.code === 11000) {
        return res.status(409).json({ error: 'Email already exists' })
      }
      console.error('save patient error:', err)
      return res.status(500).json({ error: 'Internal server error' })
    })
}

module.exports = { createAppointment }