async function tokenVerify(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')
        req.token = bearerToken[0]
        next()
    } else {
        res.status(403)
    }
}
module.exports = { tokenVerify }