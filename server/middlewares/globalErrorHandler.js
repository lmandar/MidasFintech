
function errorHandler(err, req, res, next) {
    try {
        console.log("inside global handler", err)
        let obj = {
            status_code: err.status_code || err.status,
            message: err.message || 'Internal server error!'
        }
        res.status(500).json({ data: obj })
    }
    catch (err) {
        res.status(500).json({ data: { message: "Internal server error", status_code: "0" } })
    }
}

module.exports = errorHandler