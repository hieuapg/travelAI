import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const userModel = mongoose.model('accounts', userSchema)
export {userModel as User}