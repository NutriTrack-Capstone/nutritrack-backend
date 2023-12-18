const pool = require("../config/database")

function roundToDown100(number) {
    return Math.round(number/100) * 100
}

async function getFoodByCalories(calories) {
    let lowerBound
    let upperBound
    if (calories <= 600) {
        lowerBound = Math.max(0, roundToDown100(calories - 200))
        upperBound = Math.min(roundToDown100(calories), roundToDown100(calories + 100))
    } else { // calories > 500
        lowerBound = Math.max(0, roundToDown100(calories - 400))
        upperBound = Math.min(roundToDown100(calories), roundToDown100(calories + 100))
    }
    // console.log(lowerBound)
    // console.log(upperBound)

    const sql = "SELECT * FROM Foods WHERE calories BETWEEN ? AND ?"
    const holder =  await pool.execute(sql, [lowerBound, upperBound])

    let randomizer1 = Math.floor(Math.random()*holder[0].length)

    let randomizer2 = Math.floor(Math.random()*holder[0].length)
    while (randomizer2 == randomizer1) {
        randomizer2 = Math.floor(Math.random()*holder[0].length)
    }

    let randomizer3 = Math.floor(Math.random()*holder[0].length)
    while (randomizer3 == randomizer1 || randomizer3 == randomizer2) {
        randomizer3 = Math.floor(Math.random()*holder[0].length)
    }

    return { 
        recomendation1: holder[0][randomizer1], 
        recomendation2: holder[0][randomizer2], 
        recomendation3: holder[0][randomizer3] 
    }
}

module.exports = {
    getFoodByCalories
}