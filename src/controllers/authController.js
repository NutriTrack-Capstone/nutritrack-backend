const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserAccountModel = require("../models/userModel")

const register = async (req, res) => {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 0)
    const result = await UserAccountModel.createUser(username, hashedPassword)
    res.json({ message: result })
}

const login = async (req, res) => {
    const { username, password } = req.body
    const user = await UserAccountModel.getUserByUsername(username)
    if (!user) {
        res.json({ message: "User not found" })
    } else {
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (isPasswordMatch) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })
            res.json({ message: "Login success", token })
        } else {
            res.json({ message: "Wrong password" })
        }
    }
}

module.exports = {
    register,
    login
}