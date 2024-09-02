const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Access denied. No token provided.',
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({
            status: 'error',
            message: 'Invalid token.',
        })
    }
}

module.exports = authenticate