const pool = require("../config/database")

class foodModel {
    async getFood(character) {
        try {
            const [results] = await pool.execute("SELECT * FROM Foods WHERE UPPER(name) LIKE ?", [`%${character.toUpperCase()}%`]);
            return { status: "success", data: results };
        } catch (error) {
            return { status: "error", message: "Failed to fetch food information" };
        }
    }

    async getCustomFood(character) {
        try {
            const [results] = await pool.execute("SELECT name AS foodName, calories, carbo, protein, fat, image FROM Foods WHERE UPPER(name) LIKE ?", [`%${character.toUpperCase()}%`]);
            return results;
        } catch (error) {
            return { status: "error", message: "Failed to fetch food information" };
        }
    }
}

module.exports = new foodModel();