const express = require('express')
const router = express.Router()
const dashboardService = require('./dashboard.service')
const auth = require('../../middlewares/auth')
const {encRes} = require('../../middlewares/encRes')

router.get('/fetch-data', auth, fetchData, encRes)


function fetchData (req, res, next){
    dashboardService.fetchData(req)
    .then(outputData =>{
        req.outputData = outputData
        next()
    }).catch(err => next(err))
}


module.exports = router