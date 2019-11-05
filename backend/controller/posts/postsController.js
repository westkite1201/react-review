import dao from "../../model/mariaDB/postsDao";


const savePost = async (req, res) => {
    dao.params.user_id = req.decoded.id;
    dao.params.content = req.body.obj.content;
    dao.params.title   = req.body.obj.title;
    const conn = await dao.connect();
    const rows = await dao.savePost(conn);
    conn.release();
    res.send(rows);
}
const getPosts = async (req, res) => {
    dao.params.user_id = req.decoded.id;
    const conn = await dao.connect();
    const rows = await dao.getPosts(conn);
    conn.release();
    res.send(rows.reverse())
}
module.exports = {
    savePost: savePost,
    posts: getPosts
}