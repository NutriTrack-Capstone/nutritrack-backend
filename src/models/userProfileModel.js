const pool = require("../config/database")

class UserProfileModel {
    async createUserProfile(username, age, height, weight, gender, maintainCalories, maintainCarbo, maintainProtein, maintainFat) {
        const existingUser = await this.getUserByUsername(username);
        if (existingUser == null) {
            return "USERNAME NOT FOUND";
        }

        const result = await pool.execute(
            "INSERT INTO UsersProfile (username, age, height, weight, gender, maintainCalories, maintainCarbo, maintainProtein, maintainFat, dailyCaloriesLeft, dailyCarboLeft, dailyProteinLeft, dailyFatLeft) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ", 
            [username, age, height, weight, gender, maintainCalories, maintainCarbo, maintainProtein, maintainFat, maintainCalories, maintainCarbo, maintainProtein, maintainFat]
        )
        if (result.length == 0) {
            return "FAIL CREATE USER PROFILE"
        } return "SUCCESS CREATE USER PROFILE"
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

module.exports = new UserProfileModel();