import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

import loginRouter from './routes/login.route.js'
import employeeRouter from './routes/employee.route.js'

const __dirname = path.resolve()

const app = express()
dotenv.config()

app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use('/api', loginRouter)
app.use('/api/employee', employeeRouter)

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB')
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err)
    })

app.listen(5000, () => {
    console.log('Server is running on port 5000.')
})