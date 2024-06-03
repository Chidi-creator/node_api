 const jwt = require('jsonwebtoken')
require('dotenv').config()


const verifyJWT = (req, res, next) =>{
    // extracting data from the token

    
    
const authorization = req.headers.authorization || req.headers.Authorization
    if(!authorization?.startsWith('Bearer ')) return res.sendStatus(401)
    const token = authorization.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) =>{
            if (err) return res.sendStatus(403)
                req.user = decoded.userInfo.username
                req.roles = decoded.userInfo.roles
            next()
        }
    )
}

module.exports = {verifyJWT}