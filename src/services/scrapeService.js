const https = require('https');
const jsdom = require('jsdom');

/*
mengganti input pencarian makan menjadi sesuai
dengan format yang diinginkan
token = "+" untuk adjust sesuai dengan konvensi
search yang ada pada website fatsecret.co.id
tanpa token berarti hanya menghapus extra space saja
*/
function adjustUserInput(foodName, token) {
    let adjustedName;
    let cleanExtraSpace;

    cleanExtraSpace = foodName.replace(/\s+/g, " ");

    if (token === "+") {
        adjustedName = cleanExtraSpace.replace(/\s/g, "+");
    }

    return adjustedName
}

/*
Memanfaatkan regex untuk melakukan pengaturan terhadap
output dari hasil scraping yang sangat tidak beraturan

Output dari fungsi berbentuk seperti berikut
[Nama Produk, Kalori Terkandung, Lemak Terkandung, Karbo Terkandung, Protein Terkandung]
*/
function adjustMacroScrapeOutput(productName, foodDetails) {
    let adjustedOutput = [productName]

    const calRegex = /Kalori: (\d+)/;
    const fatRegex = /Lemak: (\d+,\d+)/;
    const carbRegex = /Karb: (\d+,\d+)/;
    const protRegex = /Prot: (\d+,\d+)/;

    let totalCal = parseFloat(foodDetails.match(calRegex)[1].replace(',', '.'));
    let totalFat = parseFloat(foodDetails.match(fatRegex)[1].replace(',', '.'));
    let totalCarb = parseFloat(foodDetails.match(carbRegex)[1].replace(',', '.'));
    let totalProt = parseFloat(foodDetails.match(protRegex)[1].replace(',', '.'));

    adjustedOutput.push(totalCal)
    adjustedOutput.push(totalFat)
    adjustedOutput.push(totalCarb)
    adjustedOutput.push(totalProt)

    return adjustedOutput
}

function scrapeMacroNutrient(foodName) {
    let foodInput = adjustUserInput(foodName, "+");

    let baseURL = "https://www.fatsecret.co.id/kalori-gizi/search?q=";
    let finalURL = baseURL + foodInput;
    console.log(finalURL);

    let scrapeResult = [];
    // Melakukan scraping dengan cara mengkonversi laman dari url
    // menjadi sebuah raw html file
    https.get(finalURL, (res) => {
        let rawHtml = '';
        res.on('data', (chunk) => { rawHtml += chunk; });
        res.on('end', () => {
            console.log("test")
            if (rawHtml.includes("searchNoResult")) {
                console.log("test1")
                return "Not Found"
            }

            try {
                // Melakukan ekstraksi dari hasil raw string html sebelumnya
                const { window } = new jsdom.JSDOM(rawHtml);
                const document = window.document;

                const tableRows = document.querySelectorAll('table.generic.searchResult tr');

                tableRows.forEach((row) => {
                    const productNameElement = row.querySelector('a.prominent');
                    const brandElement = row.querySelector('a.brand');
                    const nutritionInfoElement = row.querySelector('div.smallText.greyText.greyLink');

                    if (productNameElement && brandElement && nutritionInfoElement) {
                        let productName = productNameElement.textContent.trim();
                        let nutritionInfo = nutritionInfoElement.textContent.trim();

                        let productDetail = adjustMacroScrapeOutput(productName, nutritionInfo)
                        console.log(productDetail)
                        scrapeResult.push(productDetail)
                        console.log(scrapeResult)
                    }
                });
                console.log(scrapeResult)
                console.log("test")
                return scrapeResult

            } catch (e) {
                console.error(e.message);
            }
        });
    });

    return scrapeResult;
}

function scrapeGoogleImage(foodName) {

}

function scrapeTotal(foodName) {

}

function randomizeOrder(foodList) {

}

console.log(scrapeMacroNutrient("nasi goreng"))