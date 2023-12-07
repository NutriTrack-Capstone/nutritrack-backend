const pool = require("../config/database")

class UserAccountModel {
    async createUser(username, password) {
        const result = await pool.execute(
            "INSERT INTO UsersAccount (username, password) VALUES (?,?)", 
            [username, password]
        )
        if (result.length == 0) {
            return "FAIL CREATE USER"
        } return "SUCCESS CREATE USER"
    }

    async getUserByUsername(username) {
        const [result] = await pool.execute(
            "SELECT * FROM UsersAccount WHERE username = ?", 
            [username]
        )
        if (result.length == 0) {
            return null
        } return result[0]
    }
}

module.exports = new UserAccountModel();