import dao from "../../model/mariaDB/postsDao";


const savePost = async (req, res) => {
    console.log(req.body.obj)
    console.log(req.decoded)
    dao.params.user_id = req.decoded.id;
    dao.params.content = req.body.obj.content;
    dao.params.title   = req.body.obj.title;
    const conn = await dao.connect();
    const rows = await dao.savePost(conn);
    console.log(rows);
    conn.release();
    res.send(rows);
}
const getPosts = async (req, res) => {
    dao.params.user_id = req.decoded.id;
    const conn = await dao.connect();
    const rows = await dao.getPosts(conn);
    console.log(rows)    
    conn.release();
    res.send(rows)
}
module.exports = {
    savePost: savePost,
    posts: getPosts
}