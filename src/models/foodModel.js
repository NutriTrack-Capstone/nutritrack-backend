const pool = require("../config/database")

class foodModel {
    async getFood(character) {
        try {
            const [results] = await pool.execute("SELECT * FROM Foods WHERE UPPER(name) LIKE ?", [`%${character.toUpperCase()}%`]);
            return { status: "success", data: results };
        } catch (error) {
            return { status: "error", error: "Failed to fetch food information" };
        }
    }
}

module.exports = new foodModel();