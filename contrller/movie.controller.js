const axios = require('axios');
require('dotenv').config();
const MOVIE_API_KEY = process.env.MOVIE_API_KEY
const movies = require('../models/movie.model');

const Cache = require('../helper/cache');
const cacheObj = new Cache();

const moviesController = (req, res) => {
    const title = req.query.query;
    const requestKey = `movies-${title}`;
    if (title) {
        if (cacheObj[requestKey] && (Date.now() - cacheObj[requestKey] < 86400000)) {
            res.json(cacheObj[requestKey])
        } else {
            const movieApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${title}`
            axios.get(movieApiUrl).then(response => {
                const resData = response.data.results.map(obj => new movies(obj));
                cacheObj[requestKey] = resData;
                cacheObj[requestKey].timestamp = Date.now();
                res.json(resData);
            }).catch(error => {
                res.send('error from movies api site');
            });
        }

    } else {
        res.send('Enter the city name');
    }
};
module.exports = moviesController;