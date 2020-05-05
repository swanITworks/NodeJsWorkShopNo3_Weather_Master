const fs = require('fs');
const path = require('path');

const getDataFromFile = (fileName = 'accuweather_current.json') => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname,'../mocks/' + fileName), ((err, data) => {
            if(err){
                reject(err);
                return
            }
            resolve(data);
        }));
    });
}

module.exports = getDataFromFile;
