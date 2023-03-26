const jwt = require('jsonwebtoken');

const generateToken = payload => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '12h'
    });
}
const validateToken = token => {
    if (token) {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (data) return { data };
            if (err) return { error: err };
        });
        return verifyToken;
    }
}

module.exports = { generateToken, validateToken }