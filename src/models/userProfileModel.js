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
            return {status : "error", "message":"USERNAME NOT FOUND"};
        } else if (await this.getUsernameFromUsersProfile(username)) {
            return {status : "error", "message":"USER PROFILE ALREADY EXIST"};
        }

        const result = await pool.execute(
            "INSERT INTO UsersProfile (username, age, height, weight, gender, maintainCalories, maintainCarbo, maintainProtein, maintainFat, dailyCaloriesLeft, dailyCarboLeft, dailyProteinLeft, dailyFatLeft, currentCalories, currentCarbo, currentProtein, currentFat) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ", 
            [username, age, height, weight, gender, maintainCalories, maintainCarbo, maintainProtein, maintainFat, maintainCalories, maintainCarbo, maintainProtein, maintainFat, 0, 0, 0, 0]
        )
        if (result.length == 0) {
            return {status : "error", "message":"FAIL CREATE USER PROFILE"};
        } return {status : "success", "message":"SUCCESS CREATE USER PROFILE"};
    }

    async updateUserProfile(username, age, height, weight, gender) {
        const existingUser = await this.getUsernameFromUsersProfile(username);
        if (existingUser === null) {
            return {status : "error", "message":"USERNAME NOT FOUND"};
        }

        const result = await pool.execute(
            "UPDATE UsersProfile SET age = ?, height = ?, weight = ?, gender = ? WHERE username = ?",
            [age, height, weight, gender, username]
        );

        if (result.affectedRows === 0) {
            return {status : "error", "message":"FAIL UPDATE USER PROFILE"};
        } return {status : "success", "message":"SUCCESS UPDATE USER PROFILE"};
    }

    async resetAllDailyNutrition() {
        try {
            const result = await pool.execute(
                "UPDATE UsersProfile SET dailyCaloriesLeft = maintainCalories, dailyCarboLeft = maintainCarbo, dailyProteinLeft = maintainProtein, dailyFatLeft = maintainFat, currentCalories = 0, currentCarbo = 0, currentProtein = 0, currentFat = 0"
            );

            if (result.affectedRows === 0) {
                return { status: "error", message: "FAIL RESET ALL DAILY NUTRITION" };
            }

            return { status: "success", message: "SUCCESS RESET ALL DAILY NUTRITION" };
        } catch (error) {
            console.error("Error resetting all daily nutrition:", error);
            return { status: "error", message: "Internal Server Error" };
        }
    }

    async resetDailyNutritionByUsername(username) {
        try {
            const existingUser = await this.getUsernameFromUsersProfile(username);
            if (existingUser === null) {
                return {status : "error", "message":"USERNAME NOT FOUND"};
            }

            const result = await pool.execute(
                "UPDATE UsersProfile SET dailyCaloriesLeft = maintainCalories, dailyCarboLeft = maintainCarbo, dailyProteinLeft = maintainProtein, dailyFatLeft = maintainFat, currentCalories = 0, currentCarbo = 0, currentProtein = 0, currentFat = 0 WHERE username = ?",
                [username]
            );

            if (result.affectedRows === 0) {
                return { status: "error", message: "FAIL RESET DAILY NUTRITION BY USERNAME" };
            }

            return { status: "success", message: "SUCCESS RESET DAILY NUTRITION BY USERNAME" };
        } catch (error) {
            console.error("Error resetting daily nutrition by username:", error);
            return { status: "error", message: "Internal Server Error" };
        }
    }

    async updateDailyNutrition(username, calories, carbo, protein, flat) {
        const existingUser = await this.getUsernameFromUsersProfile(username);
        if (existingUser === null) {
            return {status : "error", "message":"USERNAME NOT FOUND"};
        }

        let newDailyCaloriesLeft = Math.max(existingUser.maintainCalories - calories, 0);
        let newDailyCarboLeft = Math.max(existingUser.maintainCarbo - carbo, 0);
        let newDailyProteinLeft = Math.max(existingUser.maintainProtein - protein, 0);
        let newDailyFatLeft = Math.max(existingUser.maintainFat - flat, 0);

        let newCurrentCalories = existingUser.currentCalories + calories;
        let newCurrentCarbo = existingUser.currentCarbo + carbo;
        let newCurrentProtein = existingUser.currentProtein + protein;
        let newCurrentFat = existingUser.currentFat + flat; 

        const result = await pool.execute(
            "UPDATE UsersProfile SET dailyCaloriesLeft = ?, dailyCarboLeft = ?, dailyProteinLeft = ?, dailyFatLeft = ?, currentCalories = ?, currentCarbo = ?, currentProtein = ?, currentFat = ?  WHERE username = ?",
            [newDailyCaloriesLeft, newDailyCarboLeft, newDailyProteinLeft, newDailyFatLeft, newCurrentCalories, newCurrentCarbo, newCurrentProtein, newCurrentFat ,username]
        );

        if (result.affectedRows === 0) {
            return {status : "error", "message":"FAIL UPDATE DAILY NUTRITION"};
        } return {status : "success", "message":"SUCCESS UPDATE DAILY NUTRITION"};
    }

    async getDailyNutrition(usernamee) {
        const user = await this.getUsernameFromUsersProfile(usernamee);

        if (!user) {
            return { status: "error", message: "USERNAME NOT FOUND" };
        }

        const { username, maintainCalories, dailyCaloriesLeft, maintainCarbo, dailyCarboLeft, maintainProtein, dailyProteinLeft, maintainFat, dailyFatLeft, currentCalories, currentCarbo, currentProtein, currentFat } = user;

        return {
            status: "success",
            data: {
                username,
                maintainCalories,
                dailyCaloriesLeft,
                currentCalories,
                maintainCarbo,
                dailyCarboLeft,
                currentCarbo,
                maintainProtein,
                dailyProteinLeft,
                currentProtein,
                maintainFat,
                dailyFatLeft,
                currentFat
            },
        };
    }

    async getUserProfileByUsername(username) {
        try {
            const [result] = await pool.execute("SELECT * FROM UsersProfile WHERE username = ?", [username]);
            return result.length > 0 ? { status: "success", data: result[0] } : { status: "error", message: "User profile not found" };
        } catch (error) {
            return { status: "error", message: "Failed to fetch user profile by username" };
        }
    }

}

module.exports = new UserProfileModel();