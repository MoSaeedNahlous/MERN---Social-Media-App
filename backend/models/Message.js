const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required:true
    }, sender: {
        type: String
    }, text: {
        type: String,
        required:true
    }

}, { timestamps: true })

module.exports = mongoose.model('Message',messageSchema)
