import dbHelper from './mariaDBHelpers';
const params = {
    user_id : null,
    title   : null,
    content : null
}
const savePost = ( conn ) => {
    return conn.query(
        `insert into posts (
            user_id,
            title,
            content
        )
        values (
            ?,
            ?,
            ?
        )`,[
            params.user_id,
            params.title,
            params.content
        ]
    )
}
const getPosts = ( conn ) => {
    return conn.query(
        `select title, content 
         from posts 
         where user_id = ?
        `, [
            params.user_id
        ]
    )
}
module.exports = {
    params: params,
    savePost: savePost,
    getPosts: getPosts,
    connect: dbHelper.getConnection
}