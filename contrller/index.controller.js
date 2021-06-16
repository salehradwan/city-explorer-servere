require('dotenv').config();
const indexController = function (req, res) { // callback function of what we should do with our request
    res.send('Hello World');// our endpoint function response
  }

  module.exports = indexController;
