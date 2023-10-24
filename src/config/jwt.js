import jwt from 'jsonwebtoken'

const createToken = (data) => {
    //HS256
    let token = jwt.sign({ data }, 'minhchau', { algorithm: 'HS256', expiresIn: '1y' })
    return token;
}
const checkToken = (token) => {
    return jwt.verify(token, 'minhchau')
}
const decodeToken = (token) => {
    return jwt.decode(token)
}
const authApi = (req, res, next) => {
    try {
        let { token } = req.headers;
        checkToken(token);
        next();

    } catch (exception) {
        console.log(exception.message)
        res.status(401).send('Không có quyền truy cập!');
    }

}
export { createToken, checkToken, decodeToken, authApi }