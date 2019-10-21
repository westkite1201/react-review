import jwt from 'jsonwebtoken'
import googleClient from '../../config/google.json'
const authMiddleware = (req, res, next) => {
    // read the token from header or url 
    const token = req.headers.authorization.split(' ')[1]
    // token does not exist
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }
    console.log(googleClient.web.client_secret)
    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, googleClient.web.client_secret, (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        console.log(error.message)
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    // process the promise
    p.then((decoded)=>{
        req.decoded = decoded
        next()
    }).catch(onError)
}
module.exports = authMiddleware