const router = require('express').Router();
const User = require('../models/User')
var bcrypt = require('bcryptjs');

//Register
router.post('/register',async(req,res)=> {
    try {
        var salt = await bcrypt.genSalt(15);
        var hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            username: req.body.username,
            email:req.body.email,
            password:hashedPassword,
        })
        const savedUser = await user.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(400).json(error)
    }
})

//login
router.post('/login',async(req,res)=> {
    try {
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

        res.status(200).json(userExists)
        
    } catch (error) {
        res.status(400).json(error)
    }
})





module.exports = router