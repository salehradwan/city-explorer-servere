const express = require('express'); // require the express package
const app = express(); // initialize your express app instance

const cors = require('cors');

app.use(cors()); // after you initialize your express app instance

require('dotenv').config();



const weatherData = require('./assets/weather.json');
const PORT = process.env.PORT;
// a server endpoint
app.get('/', // our endpoint name
  function (req, res) { // callback function of what we should do with our request
    res.send('Hello World');// our endpoint function response
  });

app.get('/weather', (request, response) => {
  response.json(weatherData);
});
app.listen(PORT); // kick start the express server to work
