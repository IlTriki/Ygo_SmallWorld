const fs = require('fs');

function removeKeysFromJSON(inputFilePath, outputFilePath, keysToRemove) {
    
    const jsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

    jsonData.data.forEach(entry => {
        keysToRemove.forEach(key => delete entry[key]);
    });

    fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 2));
}

const keysToRemove = ["card_prices", "card_sets"];

const inputFile = 'Ygo_SmallWorld/card_database/cardinfo.php.json';
const outputFile = 'Ygo_SmallWorld/card_database/cardinfoStripped.php.json';

removeKeysFromJSON(inputFile, outputFile, keysToRemove);

