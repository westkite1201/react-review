//const dao =require('../../model/mariaDB/mariaDAO');
const dao = require('../../model/mariaDB/testDAO');
const getUserInfo = (req, res) => {
    console.log('getUserInfo')
    return res.json({a:3});
}
const createTable = (req, res) =>{
    try{
        console.log('object')
        
        dao.connect().getConnection().then((conn) =>{
            dao.insertUser(conn, (err, conn, result)=>{
                console.log(err)
                console.log(conn)
                console.log(result)
            })
        })
    }catch(err){
        console.log(err)
    }
}
module.exports = {
    getUserInfo: getUserInfo,
    createTable: createTable
}