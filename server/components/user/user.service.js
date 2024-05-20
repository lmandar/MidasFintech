const bcrypt = require('bcryptjs');
const User = require('./user.model');
const passport = require('passport');
const { hashPassword, comparepassword, genrateToken } = require('../../common-function/common-function')

module.exports = {
    registerUser,
    loginUser
}

async function registerUser(reqData) {
    const { name, email, password } = reqData.body;

    if (!name) throw { status_code: 0, message: "Name is required" }
    if (!email) throw { status_code: 0, message: "Please include a valid email" }
    if (!passport || passport.length < 6) throw { status_code: 0, message: "Please enter a password with 6 or more characters" }

    let user = await User.findOne({ email })

    if (user) {
        throw { status_code: 0, message: 'Email already exists' }
    } else {
        const newUser = new User({
            name,
            email,
            password,
            role_id: 2
        });

        newUser.password = await hashPassword(password)
        await newUser.save()
        return {name: newUser.name, email: newUser.email}
    }
}

async function loginUser(reqData) {
    const { email, password } = reqData.body;
    
    let user = await User.findOne({ email })
    
    if (!user) {
        throw { status_code: 0, message: 'User not found' }
    }
    let isMatch = await comparepassword(password, user.password)
    
    if (!isMatch) throw { status_code: 0, message: "Incorrect password!" }
    
    const payload = { email: user.email, name: user.name };
    const token = await genrateToken(payload)
    
    return { user: user, token: token }
}