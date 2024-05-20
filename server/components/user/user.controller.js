const express = require('express')
const router = express.Router()
const userService = require('./user.service')
const auth = require('../../middlewares/auth')
const {encRes} = require('../../middlewares/encRes')

router.post('/register', registerUser, encRes)
router.post('/login', loginUser, encRes)
router.post('/logout', logOut, encRes)



function registerUser(req, res, next) {
    userService.registerUser(req)
        .then(outputData => {
            req.outputData = outputData
            next()
        }).catch(err => next(err))
}

function loginUser(req, res, next) {
    userService.loginUser(req)
        .then(outputData => {
            req.outputData = outputData
            next()
        }).catch(err => next(err))
}

function logOut(req, res, next){
    userService.logOut(req)
        .then(outputData => {
            req.outputData = outputData
            next()
        }).catch(err => next(err))
}
module.exports = router