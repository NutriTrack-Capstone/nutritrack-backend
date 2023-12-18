const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserAccountModel = require("../models/userModel")

const register = async (req, res) => {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 0)
    const result = await UserAccountModel.createUser(username, hashedPassword)
    res.status(200).json({ message: result })
}

const login = async (req, res) => {
    const { username, password } = req.body
    const user = await UserAccountModel.getUserByUsername(username)
    if (!user) {
        res.status(404).json({ status: "error", message: "User not found" });
    } else {
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (isPasswordMatch) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })
            res.status(200).json({ status: "success", message: "Login success", token });
        } else {
            res.status(401).json({ status: "error", message: "Wrong password" });
        }
    }
}

module.exports = {
    register,
    login
}