import dbHelper from './mariaDBHelpers';
const params = {
    user_id : null
}
const doCreateQuery = (conn, cb) => {
    console.log(conn)
    conn.query(
        `
        create table user (
            id INT primary key auto_increment,
            name varchar(64),
            nickname varchar(128),
            user_id varchar(1024),
            access_token varchar(1024),
            refresh_token varchar(1024),
            expiry_date varchar(1024)
        )
        `,
        (err, result) => {
            if(err){
                console.log(err)
                return cb(err, conn);
            }else{
                console.log(result);
                return cb(null, conn, result);
            }
        }
    )
}
const selectUser = (conn,cb) => {
    console.log(conn)
    conn.query(
        `select * from user`,
        (err, result) => {
            if(err){
                console.log(err)
                return cb(err, conn);
            }else{
                console.log(result);
                return cb(null, conn, result);
            }
        }
    )
}
module.exports ={
    params: params,
    doCreateQuery: doCreateQuery,
    selectUser: selectUser,
    insertUser: insertUser,
    connect: dbHelper.pool
}