const jwt = require("jsonwebtoken");
/**
 * @param {Request} req 
 * @param {Response} res
 * @param {CallableFunction} next
 */
module.exports.verifyToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1].replace(/['"]+/g, '')
            req.token = bearerToken;

            jwt.verify(req.token, 'secretkey', (err, user) => {
                if (err) {
                    if (err instanceof jwt.TokenExpiredError) {
                        return res.status(401).send({
                            message: 'Connection timed out'
                        })
                    } else {
                        return res.status(401).send({
                            message: 'Invalid token'
                        })
                    }
                }
                req.user = user
                next()
            })
        } else {
            return res.status(403).send({
                message: `No token provided`
            })
        }
    } catch (err) {
        res.status(401).send({
            errorThrow: err,
            error: new Error(`Invalid request`)
        })
    }
};