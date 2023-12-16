const pool = require("../config/database")

class UserProfileModel {
    async getUsernameFromUsersAccount(username) {
        const [result] = await pool.execute(
            "SELECT * FROM UsersAccount WHERE username = ?", 
            [username]
        )
        if (result.length == 0) {
            return null
        } return result[0]
    }

    async getUsernameFromUsersProfile(username) {
        const [result] = await pool.execute(
            "SELECT * FROM UsersProfile WHERE username = ?", 
            [username]
        )
        if (result.length == 0) {
            return null
        } return result[0]
    }

    async createUserProfile(username, age, height, weight, gender, maintainCalories, maintainCarbo, maintainProtein, maintainFat) {
        if (await this.getUsernameFromUsersAccount(username) == null) {
            return "USERNAME NOT FOUND";
        } else if (await this.getUsernameFromUsersProfile(username)) {
            return "USER PROFILE ALREADY EXIST"
        }

        const result = await pool.execute(
            "INSERT INTO UsersProfile (username, age, height, weight, gender, maintainCalories, maintainCarbo, maintainProtein, maintainFat, dailyCaloriesLeft, dailyCarboLeft, dailyProteinLeft, dailyFatLeft) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ", 
            [username, age, height, weight, gender, maintainCalories, maintainCarbo, maintainProtein, maintainFat, maintainCalories, maintainCarbo, maintainProtein, maintainFat]
        )
        if (result.length == 0) {
            return "FAIL CREATE USER PROFILE"
        } return "SUCCESS CREATE USER PROFILE"
    }

    async updateUserProfile(username, age, height, weight, gender) {
        const existingUser = await this.getUsernameFromUsersProfile(username);
        if (existingUser === null) {
            return "USERNAME NOT FOUND";
        }

        const result = await pool.execute(
            "UPDATE UsersProfile SET age = ?, height = ?, weight = ?, gender = ? WHERE username = ?",
            [age, height, weight, gender, username]
        );

        if (result.affectedRows === 0) {
            return "FAIL UPDATE USER PROFILE";
        } return "SUCCESS UPDATE USER PROFILE";
    }

    async resetDailyNutrition() {
        const result = await pool.execute(
            "UPDATE UsersProfile SET dailyCaloriesLeft = maintainCalories, dailyCarboLeft = maintainCarbo, dailyProteinLeft = maintainProtein, dailyFatLeft = maintainFat"
        );

        if (result.affectedRows === 0) {
            return "FAIL RESET DAILY NUTRITION";
        } return "SUCCESS RESET DAILY NUTRITION";
    }

    async updateDailyNutrition(username, calories, carbo, protein, flat) {
        const existingUser = await this.getUsernameFromUsersProfile(username);
        if (existingUser === null) {
            return "USERNAME NOT FOUND";
        }

        let newDailyCaloriesLeft = Math.max(existingUser.maintainCalories - calories, 0);
        let newDailyCarboLeft = Math.max(existingUser.maintainCarbo - carbo, 0);
        let newDailyProteinLeft = Math.max(existingUser.maintainProtein - protein, 0);
        let newDailyFatLeft = Math.max(existingUser.maintainFat - flat, 0);

        const result = await pool.execute(
            "UPDATE UsersProfile SET dailyCaloriesLeft = ?, dailyCarboLeft = ?, dailyProteinLeft = ?, dailyFatLeft = ? WHERE username = ?",
            [newDailyCaloriesLeft, newDailyCarboLeft, newDailyProteinLeft, newDailyFatLeft, username]
        );

        if (result.affectedRows === 0) {
            return "FAIL UPDATE USER PROFILE";
        } return "SUCCESS UPDATE USER PROFILE";
    }

    async getDailyNutrition(usernamee) {
        const user = await this.getUsernameFromUsersProfile(usernamee);

        if (!user) {
            return { success: false, error: "USERNAME NOT FOUND" };
        }

        const { username, maintainCalories, dailyCaloriesLeft, maintainCarbo, dailyCarboLeft, maintainProtein, dailyProteinLeft, maintainFat, dailyFatLeft } = user;

        return {
            success: true,
            data: {
                username,
                maintainCalories,
                dailyCaloriesLeft,
                maintainCarbo,
                dailyCarboLeft,
                maintainProtein,
                dailyProteinLeft,
                maintainFat,
                dailyFatLeft,
            },
        };
    }

}

module.exports = new UserProfileModel();