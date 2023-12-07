const { eatTimes, mealCalRec } = require('../src/services/recommendationService')

describe("eatTimes", () => {
    test("should return 0", () => {
        expect(eatTimes(900, 900)).toBe(0)
    })
    test("should return 1", () => {
        expect(eatTimes(900, 800)).toBe(0)
    })
    test("should return 2", () => {
        expect(eatTimes(900, 700)).toBe(1)
    })
    test("should return 3", () => {
        expect(eatTimes(900, 600)).toBe(1)
    })
    test("should return 3", () => {
        expect(eatTimes(900, 500)).toBe(1)
    })
    test("should return 3", () => {
        expect(eatTimes(900, 400)).toBe(2)
    })
    test("should return 3", () => {
        expect(eatTimes(900, 300)).toBe(2)
    })
    test("should return 3", () => {
        expect(eatTimes(900, 200)).toBe(2)
    })
    test("should return 3", () => {
        expect(eatTimes(900, 100)).toBe(3)
    })
    test("should return 3", () => {
        expect(eatTimes(900, 0)).toBe(3)
    })
})

describe("mealCalRec", () => {
    test("should return 300", () => {
        expect(mealCalRec(900, 900)).toBe(300)
    }) 
    test("should return 300", () => {
        expect(mealCalRec(900, 800)).toBe(300)
    }) 
    test("should return 350", () => {
        expect(mealCalRec(900, 700)).toBe(350)
    })
    test("should return 300", () => {
        expect(mealCalRec(900, 600)).toBe(300)
    })
    test("should return 250", () => {
        expect(mealCalRec(900, 500)).toBe(250)
    })
    test("should return 200", () => {
        expect(mealCalRec(900, 400)).toBe(400)
    })
    test("should return 100", () => {
        expect(mealCalRec(900, 200)).toBe(200)
    })
    test("should return 100", () => {
        expect(mealCalRec(900, 100)).toBe(100)
    })
    test("should return 100", () => {
        expect(mealCalRec(900, 0)).toBe(100)
    })
})