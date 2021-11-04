import React, { useState, useContext, useEffect, useReducer } from 'react';
import { useCallback } from 'react';
import { Loading } from './loading';
import { MovieList } from './movie-list';
import { API_KEY, IMAGE_BASE_URL } from "./config";


const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    const getLocalStorageWatchlist = () => {
        let watchMovies = localStorage.getItem("watchlist");
        if (watchMovies) {
            return JSON.parse(watchMovies);
        }
        else {
            return []
        }
    }

    const getLocalStorageRatings = () => {
        let ratings = localStorage.getItem("ratings");
        if (ratings) {
            return JSON.parse(ratings);
        }
        else {
            return []
        }
    }
    
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
    const [searchResults, setSearchResults] = useState([]);
    const [watchlist, setWatchlist] = useState(getLocalStorageWatchlist());
    const [movieRatings, setMovieRatings] = useState(getLocalStorageRatings());
    const [searchTerm, setSearchTerm] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [typeOfMovie, setTypeOfMovie] = useState("top_rated");
    const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${pageNumber}`);
    const [homePageImageIndex, setHomePageImageIndex] = useState(0);
    const [homePageImageUrl, setHomePageImageUrl] = useState("");

    const toggleWatchlist = (movieId, title, release_date, rating) => {
        const watchlistMovie = {
            id: movieId,
            title, 
            release_date,
            rating
        }
        const exists = watchlist.find((movie) => movie.id === movieId);
        if (!exists) {
            const newMovieWatchlist = [...watchlist, watchlistMovie];
            setWatchlist(newMovieWatchlist);
        }
        else {
            const newMovieWatchlist = watchlist.filter((movie) => movie.id !== movieId);
            setWatchlist(newMovieWatchlist);
        }
    }

    const rateMovies = (score, movieId, title, release_date, rating) => {
        const ratedMovie = {
            id: movieId,
            score: parseInt(score),
            title, 
            release_date, 
            rating
        };
        const exists = movieRatings.find((rating) => rating.id === movieId);
        if (!exists) {
            const newMovieRatingsList = [...movieRatings, ratedMovie];
            setMovieRatings(newMovieRatingsList);
        }
        else {
            const updateItemIndex = movieRatings.indexOf(exists);
            movieRatings[updateItemIndex].score = parseInt(score);
            const newMovieRatingsList = [...movieRatings]
            setMovieRatings(newMovieRatingsList);
        }
    }

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist])
    useEffect(() => {
        localStorage.setItem("ratings", JSON.stringify(movieRatings));
    }, [movieRatings])
    
    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch(`${searchUrl}${searchTerm}`);
                const data = await response.json();
                if (response.status !== 404) {
                    let searchMovieList = [];
                    for (let i = 0; i < data.results.length; i++) {
                        const newMovie = {
                            movieId:data.results[i].id, 
                            title:data.results[i].title, 
                            poster:data.results[i].poster_path, 
                            release_date:data.results[i].release_date, 
                            popularity:data.results[i].popularity, 
                            rating:data.results[i].vote_average
                        };
                        searchMovieList = [...searchMovieList, newMovie];
                    }
                    setSearchResults(searchMovieList);
                }
                if (data.results.length === 0) {
                    setSearchResults([]);
                }
            }
            catch (error) {
            }
        }
        fetchMovies();
    }, [searchTerm])

    const filterMovies = () => {
        if (typeOfMovie === "trending") {
            setUrl(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
        }
        else {
            setUrl(`https://api.themoviedb.org/3/movie/${typeOfMovie}?api_key=${API_KEY}&language=en-US&page=${pageNumber}`);
        }
    }
    useEffect(() => {
        filterMovies();
    }, [pageNumber, typeOfMovie])

    const togglePage = (action) => {
        document.body.scrollTop = 500;
        document.documentElement.scrollTop = 500;
        if (typeOfMovie === "top_rated" || typeOfMovie === "popular") {
            if (action === "next") {
                setPageNumber(pageNumber + 1);
            }
            else if (action === "back") {
                setPageNumber(pageNumber - 1);
            }
        }
    }

    useEffect(() => {
        async function getPopularImage() {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
                const data = await response.json();
                if (response.status !== 404) {
                    let imageSize = "";
                    if (window.innerWidth >= 501) {
                        imageSize = "original";
                    }
                    else {
                        imageSize = "w780";
                    }
                    const imagePath = data.results[homePageImageIndex].poster_path;
                    const newImageUrl = `${IMAGE_BASE_URL}${imageSize}${imagePath}`;
                    setHomePageImageUrl(newImageUrl);
                }
            }
            catch (error) {}
        }
        getPopularImage();
    }, [homePageImageIndex])

    const bannerImage = () => {
        const randomInt = Math.floor(Math.random() * 20);
        setHomePageImageIndex(randomInt);
    }

    const returnToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <AppContext.Provider value={{watchlist, setWatchlist, toggleWatchlist, filterMovies, setSearchTerm, rateMovies, movieRatings, searchResults, setSearchResults, url, typeOfMovie, setTypeOfMovie, pageNumber, setPageNumber, togglePage, bannerImage, homePageImageUrl, returnToTop}}>
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }