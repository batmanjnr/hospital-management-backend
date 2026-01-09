const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const port =3700
const ejs = require('ejs')
app.set('view engine', 'ejs')
const mongoose = require('mongoose')
const uri = process.env.uri
app.use(express.urlencoded({extended:true }))
app.use(express.json())
const userRoutes = require('./routes/user.routes')
const doctorRoutes = require('./routes/doctors.routes')
const adminRoutes = require('./routes/admin.routes')

const cors = require('cors')
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}))
app.use('/patient', userRoutes)
app.use('/doctor', doctorRoutes)
// app.use('/admin', adminRoutes)
mongoose.connect(uri)
.then(()=>{
    console.log('connected');
    
})
.catch((err)=>{
    console.log('not connected');
    

})







app.listen(port , (err)=>{
    if(err){
        console.log('not active');
        
    }else{
        console.log('active on port 3700');
        
    }
})