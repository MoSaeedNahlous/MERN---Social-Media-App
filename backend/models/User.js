const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type:String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    }, email: {
        type: String,
        require: true,
        max: 50,
        unique:true,
    }, password: {
        type: String,
        min: 8,
        require: true,
    }, profilePic: {
        type: String,
        default:""
    }, coverPic: {
        type: String,
        default:""
    }, followers: {
        type: Array,
        default:[]
    }, followings: {
        type: Array,
        default:[]
    }, isAdmin: {
        type: Boolean,
        default:false
    }, desc: {
        type: String,
        max:100
    }, city: {
        type: String,
    }, from: {
        type: String,
    }, relationShip: {
        type: String,
        enum:[1,2,3,4,5]
    }
}, { timestamps: true })

module.exports = mongoose.model('User',userSchema)
