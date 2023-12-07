const pool = require("../config/database")

async function getFoodByCalories(calories) {
    const sql = "SELECT * FROM Foods WHERE calories <= ?"
    const holder =  await pool.execute(sql, [calories])

    return holder[0][holder[0].length - 1]
}

module.exports = {
    getFoodByCalories
}