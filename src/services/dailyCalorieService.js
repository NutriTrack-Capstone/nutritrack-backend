/*
weight dalam satuan kg
height dalam satuan cm
gender berupa 1 (male) dan 2 (female)
age bertipe integer
*/
function calculateBMR (weight, height, gender, age) {
    if (gender === 1) {
        let maleBMR =  88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
        return Math.round(maleBMR)
    }
    else if (gender === 2) {
        let femaleBMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.33 * age)
        return Math.round(femaleBMR)
    }
    else {
        throw new Error("Invalid Gender.")
    }
}

/*
activity level berkisar dari 1-5
1 = sedentary
2 = lightly active
3 = moderately active
4 = very active
5 = extremely active

gunakan activityLevel 3 (ideal)
*/
function calculateDailyCalories(weight, height, gender, age, activityLevel) {
    bmr = calculateBMR(weight, height, gender, age)

    let  dailyCalories;

    switch (activityLevel) {
        case 1:
            dailyCalories = bmr * 1.2;
            break;
        case 2:
            dailyCalories = bmr * 1.375;
            break;
        case 3:
            dailyCalories = bmr * 1.55;
            break;
        case 4:
            dailyCalories = bmr * 1.725;
            break;
        case 5:
            dailyCalories = bmr * 1.9;
            break;
        default:
            throw new Error("Invalid Activity Level.")
    }

    return Math.round(dailyCalories);
}

module.exports = {
    calculateBMR,
    calculateDailyCalories,
};