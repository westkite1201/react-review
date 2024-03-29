import dao from "../../model/mariaDB/userDao"
const insertSubscribe_info = async (req, res) => {
    dao.params.user_id   = req.decoded.id;
    dao.params.subs_info = req.body.subscribe_value;
    const conn = await dao.connect();
    const rows = await dao.insertSubscribeInfo(conn);
    console.log(rows)
    conn.release();
    res.send(rows)
}
const deleteSubscribe_info = async (req, res) => {
    dao.params.user_id   = req.decoded.id;
    const conn = await dao.connect();
    const rows = await dao.deleteSubscribeInfo(conn);
    console.log(rows)
    conn.release();
    res.send(rows)
}
module.exports = {
    insertSubscribe_info: insertSubscribe_info,
    deleteSubscribe_info: deleteSubscribe_info
}
