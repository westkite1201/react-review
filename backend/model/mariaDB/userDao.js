import dbHelper from './mariaDBHelpers';
const params = {
    user_id      : null,
    name         : null,
    subs_info    : null,
    nickname     : null
}
const signUp = (conn) => {
    return conn.query(
        `insert into user (
            user_id,
            name,
            nickname
        )
        values (
            ?,
            ?,
            ?
        )`,
        [
            params.user_id,
            params.name,
            params.nickname
        ]
    )
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
const insertSubscribeInfo = ( conn ) => {
    return conn.query(
        `insert into subs_info (
            user_id,
            subs_info
        )
        values (
            ?,
            ?
        )`,
        [
            params.user_id,
            params.subs_info
        ]
    )
}
const deleteSubscribeInfo = (conn) => {
    return conn.query(
        `delete from subs_info 
         WHERE subs_info = ?
        `,
        [
            params.subs_info
        ]
    )
}
const selectSubscribeInfo = (conn) => {
    return conn.query(
        `select subs_info 
         from subs_info
         where user_id = ?
        `,[
            params.user_id
        ]
    )
}
module.exports = {
    params: params,
    insertSubscribeInfo: insertSubscribeInfo,
    deleteSubscribeInfo: deleteSubscribeInfo,
    selectSubscribeInfo: selectSubscribeInfo,
    checkSignUp: checkSignUp,
    signUp: signUp,
    connect: dbHelper.getConnection
}