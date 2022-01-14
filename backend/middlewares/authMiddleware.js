const jwt = require('jsonwebtoken')
const User = require('../models/User')

//get request with token and check the token's owner
export const protect = async (req, res, next) => {
    let token
    //check if there is an auth header then check if the value start with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       try {
            token = req.headers.authorization.split(' ')[1]
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decodedPayload.userId)
            next()
       } catch (error) {
            console.log(error)
            res.status(401);
            throw new Error('Not authorized!,token is not valid!');
       } 
    } 
    if (!token) {
        res.status(401);
        throw new Error('Not authorized!,no token!');
    }
}

