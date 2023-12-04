const { calculateBMR, calculateDailyCalories } = require("../src/services/dailyCalorieService")

describe("calculateBMR", () => {
    test("should calculate BMR for male", () => {
        const result = calculateBMR(70, 175, 1, 25);
        expect(result).toBeCloseTo(1724);
    });
  
    test("should calculate BMR for female", () => {
        const result = calculateBMR(60, 160, 2, 30);
        expect(result).toBeCloseTo(1368);
    });
  
    test("should throw an error for invalid gender", () => {
        expect(() => calculateBMR(60, 160, 3, 30)).toThrow('Invalid Gender.');
    });
  });
  
  describe("calculateDailyCalories", () => {
    test("should calculate daily calories for ideal activity level (male)", () => {
        const result = calculateDailyCalories(72, 167, 1, 21, 3);
        expect(result).toBe(2689);
    });

    test("should calculate daily calories for ideal activity level (female)", () => {
        const result = calculateDailyCalories(72, 167, 2, 21, 3);
        expect(result).toBe(2387);
    });
  
    test("should throw an error for invalid activity level", () => {
        expect(() => calculateDailyCalories(60, 160, 2, 30, 6)).toThrow('Invalid Activity Level.');
    });
});