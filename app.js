const express = require('express');
const mocks = require('./routes/weather-mocks.js');
const weather = require('./routes/weather.js');
const dotenv = require('dotenv');

const app = express();
app.use(express.static('weather'));

app.use('/mocks', mocks);
app.use('/weather', weather);

app.listen(port = process.env.PORT, () => {
  console.log(`Listening on port ${port}...`);
});

app.listen();
