const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = process.env.REACT_APP_API_KEY;

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';

const BACKDROP_SIZES = ["w300","w780","w1280","original"];
const LOGO_SIZES = ["w45","w92","w154","w185","w300","w500","original"];
const POSTER_SIZES = ["w92","w154","w185","w342","w500","w780","original"];

export {
    API_URL,
    API_KEY,
    IMAGE_BASE_URL,
    BACKDROP_SIZES,
    LOGO_SIZES,
    POSTER_SIZES
};