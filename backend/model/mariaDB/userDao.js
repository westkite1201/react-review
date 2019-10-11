import dbHelper from './mariaDBHelpers';
const params = {
    user_id      : null,
    name         : null,
    nickname     : null
}
const checkSignUp = (conn) => {
    return conn.query(
        `
        select user_id 
        from user
        where user_id = ?
        `,
        [
            params.user_id
        ]
    )
}
const allUsers = ( conn ) => {
    return conn.query(
        `select * from user`
    )
}
const signUp = ( conn ) => {
    return conn.query(
        `insert into user (
            name,
            nickname,
            user_id
        )
        values (
            ?,
            ?,
            ?
        )`,[
            params.name,
            params.nickname,
            params.user_id
        ]
    )
}
module.exports = {
    params: params,
    checkSignUp: checkSignUp,
    signUp: signUp,
    allUsers: allUsers,
    connect: dbHelper.pool
}