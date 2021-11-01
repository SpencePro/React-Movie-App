import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./context";
import { Error } from "./error";
import { useParams } from 'react-router';
import { Loading } from './loading';
import { API_KEY, IMAGE_BASE_URL, LOGO_SIZES, POSTER_SIZES } from "./config";
import { RatingForm } from "./forms";
import { Link } from "react-router-dom";

export const SingleMovie = () => {
    const {id} = useParams();
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});

    const recommendationsUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
    const [recLoading, setRecLoading] = useState(false);
    const [recMovies, setRecMovies] = useState([]);

    const {watchlist, toggleWatchlist, movieRatings} = useGlobalContext();

    let present = false;
    const inWatchList = watchlist.find((movie) => movie.id === parseInt(id));
    if (inWatchList) {
        present = true;
    }

    let userRating = 0; 
    const userRated = movieRatings.find((rating) => rating.id === parseInt(id));
    if (userRated) {
        userRating = parseInt(userRated.score);
    }

    useEffect(() => {
        setLoading(true);
        async function fetchMovies() {
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (response.status !== 404) {
                    const {
                        id: movieId,
                        title: title,
                        overview: synopsis,
                        poster_path: poster,
                        release_date: release_date,
                        runtime: runtime,
                        popularity: popularity,
                        vote_average: rating,
                        vote_count: vote_count,
                    } = data
                    const newMovie = {
                        movieId, title, synopsis, poster, release_date, runtime, popularity, rating, vote_count
                    }
                    setMovie(newMovie);
                    setLoading(false);
                }
                else {
                    setLoading(false);
                    setMovie(null);
                }
            }
            catch (error) {
                setLoading(false);
            }
        }
        fetchMovies();
    }, [id])

    useEffect(() => {
        setRecLoading(true);
        async function fetchMovieRecs() {
            try {
                const response = await fetch(recommendationsUrl);
                const data = await response.json();
                if (response.status !== 404) {
                    let recMovieList = [];
                    for (let i = 0; i < 5; i++) {
                        const movieRec = {
                            movieId:data.results[i].id, 
                            title:data.results[i].title, 
                            poster:data.results[i].poster_path
                        };
                        recMovieList = [...recMovieList, movieRec];
                    }
                    setRecMovies(recMovieList);
                    setLoading(false);
                }
                else {
                    setLoading(false);
                    setRecMovies(null);
                }
            }
            catch (error) {
                setRecLoading(false);
            }
        }
        fetchMovieRecs();
    }, [id])
    
    if (loading) {
        return <Loading />
    }

    if (!movie) {
        return <Error/>
    }

    const {movieId, title, synopsis, poster, release_date, runtime, popularity, rating, vote_count} = movie;

    return (
        <main>
            <header>
                <h2>{title}</h2>
                <img src={`${IMAGE_BASE_URL}w500${poster}`} alt={title} />
                <h5>Community Score: {rating} ({vote_count} votes)</h5>
                <h5>Popularity: {popularity}</h5>
                <h5>{runtime} minutes</h5>
                <h5>Released {release_date}</h5>
            </header>
            <div className="single-movie-synopsis">
                <p>{synopsis}</p>
            </div>
            <div className="user-options">
                <h5>Your Score: {userRating > 0 ? userRating:"N/A"}</h5>
                <RatingForm id={movieId} title={title} release_date={release_date} rating={rating} />
                <div className="watchlist-button-div">
                    <h5>{present ? "In Watchlist":""}</h5>
                    <button type="button" className="btn watchlist-btn" 
                    onClick={() => toggleWatchlist(movieId, title, release_date, rating)}>
                        {present ? "Remove from Watchlist":"Add to Watchlist"}
                    </button>
                </div>
            </div>
            {!recMovies ? 
            <div>
                <h5>recommendations could not be retrieved at this time</h5>
            </div>
            :
            <div className="recommendations">
                <h5>Similar movies</h5>
                {recMovies.map((movie) => {
                    return (
                        <article className="movie-rec" key={movie.movieId}>
                            <img src={`${IMAGE_BASE_URL}w92${movie.poster}`} alt={movie.title} />
                            <p><Link to={`/movie/${movie.movieId}`}>{movie.title}</Link></p>
                        </article>
                    )
                })}
            </div>
            }
        </main>
    );
}