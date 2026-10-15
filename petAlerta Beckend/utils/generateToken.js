const jwt = require('jsonwebtoken');

function generateToken(user){
    return jwt.sign(
        {
            id: user.id,
            cargo: user.cargo
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '12h'
        }
    );
}

module.exports = generateToken;