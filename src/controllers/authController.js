const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserAccountModel = require("../models/userModel")

const register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 0);

    try {
        const result = await UserAccountModel.createUser(username, hashedPassword);

        if (result === "USERNAME ALREADY EXISTS") {
            // Username already exists, return 409 Conflict
            res.status(409).json({ status: "error", message: result });
        } else if (result === "FAIL CREATE USER") {
            // Failed to create user, return 500 Internal Server Error
            res.status(500).json({ status: "error", message: result });
        } else {
            // Successful registration, return 201 Created
            res.status(201).json({ status: "success", message: result });
        }
    } catch (error) {
        // Handle other errors, return 500 Internal Server Error
        console.error("Error during registration:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

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