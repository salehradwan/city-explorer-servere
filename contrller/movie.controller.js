const axios = require('axios');
const { response } = require('express');
require('dotenv').config();
const MOVIE_API_KEY = process.env.MOVIE_API_KEY
const movies = require('../models/movie.model');


const moviesController = (req, res) => {
    const title = req.query.query;

    if (title) {
        const movieApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${title}`
        axios.get(movieApiUrl).then(response => {
            const resData = response.data.results.map(obj => new movies(obj));
            res.json(resData);
        }).catch(error => {
            res.send('error from movies api site');
        });
    } else {
        res.send('Enter the city name');
    }
};
module.exports = moviesController;