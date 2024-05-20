const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt)
        return hashPassword
    } catch (err) {
        throw err
    }
}

async function comparepassword(password, hashPassword) {
    try {
        let is_match = await bcrypt.compare(password, hashPassword)
        if (is_match) {
            return true
        } else {
            return false
        }
    } catch (err) {
        throw err
    }
}

async function genrateToken(payload){
    try{
        return await jwt.sign(payload, process.env.SECRET_KEY,  { expiresIn: '5m' })
    }catch(err){
        throw err
    }
}

module.exports = {
    hashPassword,
    comparepassword,
    genrateToken
}