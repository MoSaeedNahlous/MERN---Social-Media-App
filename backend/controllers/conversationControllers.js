const Conversation = require('../models/Conversation')
const User = require('../models/User')

const createConversation = async (req, res) => {
    if (req.body.receiverId) {
        const reciever = await User.findById(req.body.receiverId).catch((_) => {
            res.status(500);
            throw new Error('Wrong user Id!');
        });
        if (!reciever) {
            res.status(404);
            throw new Error('No user to be found!');
        }
        if (req.body.receiverId !== req.user._id.toString()) {
            const newConversation = new Conversation({
            members: [
                req.user._id,
                req.body.receiverId
            ]
        })
        const savedConversation = await newConversation.save()
        if (!savedConversation) {
            res.status(500)
            throw new Error('Try again later..')  
        }
        res.status(200).json(savedConversation)  
        } else {
            res.status(500)
            throw new Error("You can't chat yourself, can you?") 
        }
        } else {
            res.status(500)
            throw new Error('DENIED!')   
        }  
}

const getConversation = async (req, res) => {
    const conversation = await Conversation.find({
        members:{$in:[req.user._id.toString()]}
    })
    if (!conversation) {
        res.status(500)
        throw new Error('Try again later..')  
    }
    res.status(200).json(conversation)
}

module.exports ={createConversation,getConversation}