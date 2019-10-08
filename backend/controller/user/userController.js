
const getUserInfo = (req, res) => {
    console.log('getUserInfo')
    return res.json({a:3});
}

module.exports = {
    getUserInfo: getUserInfo,
}