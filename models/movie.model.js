class movieResult {
    constructor(moviesData) {
        this.title = moviesData.title;
        this.overview = moviesData.moviesData;
        this.vote_average = moviesData.vote_average;
        this.vote_count = moviesData.vote_count;
        this.overview = moviesData.moviesData;
        this.popularity = moviesData.popularity;
        this.release_date = moviesData.release_date;

    }
}

module.exports = movieResult;