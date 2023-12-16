const jwt = require("jsonwebtoken")

function authMiddleware (req, res, next) {
    const token = req.headers.authorization
    // console.log("ini middle ware", token)
    if (!token) {
        res.json({ message: "Token not found" })
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.id
            next()
        } catch (error) {
            res.json({ message: "Token invalid" })
        }
    }
}

module.exports = { 
    authMiddleware
}