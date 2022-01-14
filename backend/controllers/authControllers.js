const User = require('../models/User')
var bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken') 


const register = async (req, res) => {
    var salt = await bcrypt.genSalt(15);
    var hashedPassword = await bcrypt.hash(req.body.password, salt);
    const validEmail = await User.findOne({ email: req.body.email })
    if (validEmail) {
        res.status(500)
        throw new Error('Entered email is already taken!');
    }
    const validUsername = await User.findOne({ username: req.body.username })
    if (validUsername) {
        res.status(500)
        throw new Error('Entered username is already taken!');
    }
    const user = new User({
        username: req.body.username,
        email:req.body.email,
        password:hashedPassword,
    })
    const savedUser = await user.save()
    if (savedUser) {
        res.status(200).json(savedUser)
    } else {
        res.status(500).json('error')
    }
        
}

const login = async(req,res)=> {
    
    const userExists = await User.findOne({ email: req.body.email })
    if (!userExists) {
        res.status(400).json("Wrong email or password!")
        return
    } 
    const validPassword = await bcrypt.compare(req.body.password, userExists.password)  
    if (!validPassword) {
        res.status(400).json("Wrong email or password!") 
        return
    }
    const token = generateToken(userExists._id)
    res.status(200).json({user:userExists,token})
}

const getCurrentUesr = (req,res) => {
    const currentUser = req.user
    res.status(200).json({user:currentUser})
}

module.exports={register,login,getCurrentUesr}
