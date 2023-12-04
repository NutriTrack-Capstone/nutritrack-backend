const { adjustUserInput, adjustMacroScrapeOutput } = require("../src/services/scrapeService")

describe("adjustUserInput", () => {
    test("should replace extra spaces with a single space when token is not +", () => {
      const result = adjustUserInput("   Chicken    Breast   ", "");
      expect(result).toBe('Chicken Breast');
    });
  
    test("should replace spaces with + when token is +", () => {
      const result = adjustUserInput("   Chicken    Breast   ", "+");
      expect(result).toBe("Chicken+Breast");
    });
  
    test("should replace spaces with + when token is +", () => {
        const result = adjustUserInput("Tahu Goreng Kecap Manis", "+");
        expect(result).toBe("Tahu+Goreng+Kecap+Manis");
    });
});

describe("adjustMacroScrapeOutput", () => {
    test("should adjust macro scrape output for valid input", () => {
      const productName = 'Chicken Breast';
      const foodDetails = 'Kalori: 150 Lemak: 5,2 Karb: 0,6 Prot: 30,5';
      const result = adjustMacroScrapeOutput(productName, foodDetails);
      expect(result).toEqual([productName, 150, 5.2, 0.6, 30.5]);
    });

    test("should adjust macro scrape output for valid input", () => {
        const productName = 'Chicken Breast';
        const foodDetails = 'Kalori: 150.06 Lemak: 5,2 Karb: 0,6 Prot: 30,5';
        const result = adjustMacroScrapeOutput(productName, foodDetails);
        expect(result).toEqual([productName, 150, 5.2, 0.6, 30.5]);
      });
});