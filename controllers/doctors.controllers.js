const bcrypt = require('bcryptjs')
const saltRounds = 10
const userModel = require('../models/doctor.models')
const patientModel = require('../models/user.models')

const getAuth = (req, res) => {
  const { email, password } = req.body
  // usercheck
  userModel.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        res.status(400).send('email exist ')
      }
      return bcrypt.hash(password, saltRounds)
    })
    .then((hashedPassword) => {
      if (!hashedPassword) return;

      const newUser = new userModel({
        email,
        password: hashedPassword

      })
      return newUser.save()
      res.status(201).json({ success: true, message: 'user registered' })
    })
    .catch((err) => {
      if (err !== 'user already exist') {
        console.log('error saving user', err);
        res.status(500).send('internal server error')

      }
    })
}


const getLogin = (req, res) => {
  console.log('req.body:', req.body)
  const { email, password } = req.body

  if (!email || !password) {
    console.log('all fields are required');
    return res.status(400).json({ success: false, message: 'email and password required' })
  }

  userModel.findOne({ email: email })
    .then((foundUser) => {
      if (!foundUser) {
        console.log('user not found');
        return res.status(404).json({ success: false, message: 'user not found' })
      }

      return bcrypt.compare(password, foundUser.password)
        .then((matched) => {
          if (matched) {
            console.log('successful')
            return res.status(200).json({ success: true, message: 'user found' })
          } else {
            console.log('invalid mail or pass');
            return res.status(401).json({ success: false, message: 'invalid email or password' })
          }
        })
    })
    .catch((err) => {
      console.error('error during login:', err);
      return res.status(500).json({ success: false, message: 'internal server error' })
    })
}


const getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.find({}).lean().exec();
    res.status(200).json(patients); // You MUST send the data back
  } catch (err) {
    console.error('getAllPatients error', err);
    res.status(500).json({ error: 'internal server error' });
  }
};

module.exports = { getAuth, getLogin, getAllPatients }