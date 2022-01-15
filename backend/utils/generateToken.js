const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
    //sign will take a payload first,then secret,time span
    return jwt.sign({userId:userId.toString()},process.env.JWT_SECRET,{expiresIn:'1d'})
}

module.exports = generateToken