const config = require('../../config/dbConfig.js')

const mariadb = require('mariadb')
const pool = mariadb.createPool({
                connectionLimit : 10,
                user: config.mariadb.user,
                host: config.mariadb.host,
                password:config.mariadb.password,
                database:config.mariadb.database
            })
const getConnection = () => {
    return pool.getConnection()
}
module.exports = {
    getConnection: getConnection
}