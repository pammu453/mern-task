import mongoose from "mongoose"

const loginSchema = new mongoose.Schema({
    f_userName: {
        type: String,
        required: true
    },
    f_Pwd: {
        type: String,
        required: true
    }
}, { collection: 't_login' })

const Login = mongoose.model('Login', loginSchema)

export default Login
