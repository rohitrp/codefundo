const jwt = require('jsonwebtoken')

require('dotenv').config()

SECRET = process.env.SECRET

function createToken(user) {
    return jwt.sign(
        {
            id: user._id, 
            email: user.email, 
        }, 
        SECRET, 
        { 
            algorithm: 'HS256', 
            expiresIn: '1h' 
        }
    )
}

module.exports = createToken