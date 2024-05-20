// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../components/user/user.model');

module.exports = (req, res, next) => {
    const token = req.header('Authorization').split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};
