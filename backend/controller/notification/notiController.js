import dao from '../../model/mariaDB/userDao'
import webpush from 'web-push'
import ms from 'millisecond'

const pushNotification = async (req, res)=> {
  dao.params.user_id   = req.decoded.id;
  const conn = await dao.connect().getConnection();
  const rows = await dao.selectSubscribeInfo(conn);
  conn.end();
  console.log('rows:', rows)
  console.log('rows0', rows[0])
  const subscription = JSON.parse(rows[0].subs_info);
  const payload = new Buffer.from(JSON.stringify(req.body.message), 'utf8')
  let time = ms(req.body.time)
  setTimeout(()=> {
    webpush.sendNotification(subscription, payload)
    .then(res =>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })
  }, time)
  console.log(subscription)
  res.send('done')
}

const getVAPID = (req, res) => {
    res.send(process.env.VAPID_PUBLIC_KEY)
}
module.exports = {
    pushNotification: pushNotification,
    getVAPID: getVAPID
}