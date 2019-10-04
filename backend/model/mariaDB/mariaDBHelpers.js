const config = require('../config/dbConfig.js')
const mariadb = require('mariadb')

const pool = mariadb.createPool({
    connectionLimit : 10,
    user: config.mariadb.user,
    host: config.mariadb.host,
})
module.exports = {
    pool: pool
}