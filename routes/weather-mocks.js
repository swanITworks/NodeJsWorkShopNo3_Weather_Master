const express = require('express');
const getDataFromFile = require('../utils/utils.js');
const mocks = express.Router();

mocks.param('fileName', (req, res, next, id) => {
    req.filename = id;
    next();
});

mocks.get('/:fileName', async (req, res) => {
    const response = await getDataFromFile(req.filename).then(data => JSON.parse(data.toString())).catch(err => console.log(err.message));
    res.send(JSON.stringify(response,null,'\t'));
});

module.exports = {
    mocks,
}