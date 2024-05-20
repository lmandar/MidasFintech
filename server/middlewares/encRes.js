module.exports = {
    encRes
}

function encRes(req, res, next){
    try{
        req.outputData.status_code = "1"
        req.outputData.message = "Success"
        res.status(200).json({ data: req.outputData })
    }catch(err){
        console.log("err-->>", err)
        next(err)
    }
}