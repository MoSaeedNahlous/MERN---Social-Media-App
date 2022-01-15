const Message = require("../models/Message")
const Conversation = require("../models/Conversation")



const addMessage = async (req, res) => {
    const conversation = await Conversation.findById(req.body.conversationId).catch((_) => {
      res.status(500);
      throw new Error('Wrong conversation Id!');
    });
    if (!conversation) {
      res.status(404);
      throw new Error('No conversation to be found!');
    }
    const newMessage = new Message({
        conversationId: req.body.conversationId,
        sender: req.user._id,
        text: req.body.text
    })
    const savedMessage = await newMessage.save()
    res.status(200).json(savedMessage)
}

const getMessages = async (req, res) => {
    const conversation = await Conversation.findById(req.params.conversationId).catch((_) => {
      res.status(500);
      throw new Error('Wrong conversation Id!');
    });
    if (!conversation) {
      res.status(404);
      throw new Error('No conversation to be found!');
    }
    if(conversation.members.includes(req.user._id)) {
        const messages = await Message.find({
        conversationId:req.params.conversationId
    })
    res.status(200).json(messages)
    } else {
        res.status(403)
        throw new Error('DENIED!')
    }
    
}


module.exports = {addMessage,getMessages}