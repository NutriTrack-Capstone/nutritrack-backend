// Fungsi yang menghitung sekiranya orang bersangkutan
// sudah makan berapa kali dalam sehari
function eatTimes(maintenanceCalories, calorieLeft) {
    const eatenSoFar = maintenanceCalories - calorieLeft

    if (eatenSoFar <= 100) {
        return 0
    } else if (eatenSoFar <= 100 + maintenanceCalories / 3) {
        return 1
    } else if (eatenSoFar <= 100 + maintenanceCalories * 2 / 3) {
        return 2
    } else {
        return 3
    }
}

// Fungsi yang menghitung kalori yang harus dikonsumsi
// dalam satu kali makan untuk fitur rekomendasi makanan
function mealCalRec(maintenanceCalories, calorieLeft) {
    const eatenTimes = eatTimes(maintenanceCalories, calorieLeft)

    if (eatenTimes == 0) {
        return Math.floor(maintenanceCalories / 3)
    } else if (eatenTimes == 1) {
        return Math.floor(calorieLeft / 2)
    } else if (eatenTimes == 2) {
        return Math.floor(calorieLeft)
    } else {
        return 100 // untuk snack
    }
}

module.exports = {
    eatTimes,
    mealCalRec
}