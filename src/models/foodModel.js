const pool = require("../config/database")

class foodModel {
    async getFood(character) {
        try {
            const [results] = await pool.execute("SELECT * FROM Foods WHERE UPPER(name) LIKE ?", [`%${character.toUpperCase()}%`]);
            return { success: true, data: results };
        } catch (error) {
            return { success: false, error: "Failed to fetch food information" };
        }
    }
}

module.exports = new foodModel();