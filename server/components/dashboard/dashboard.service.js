const User = require('../user/user.model')

module.exports = {
    fetchData
}

async function fetchData(reqData){
    const user = await User.findOne({email: reqData.user.email})
    if(!user){
        throw {status_code: "0", message:"Customer not found"}
    }
    let userCount = user.role_id === 1 ? await User.find().countDocuments() : 0 

    let obj = {
        name: user.name,
        email: user.email
    }
    return {userCount: userCount, user: obj}
}   