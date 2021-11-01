import React, { useState, useEffect }  from "react";
import { useGlobalContext } from "./context";
import { Loading } from './loading';
import { Link } from 'react-router-dom';
import { Error } from "./error";
import { IMAGE_BASE_URL } from "./config";

export const MovieList = () => {
    const [loading, setLoading] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const { url, typeOfMovie, pageNumber, togglePage } =  useGlobalContext();

    const titles = {
        top_rated: "Top Rated",
        popular: "Most Popular",
        trending: "Trending"
    }

    useEffect(() => {
        setLoading(true);
        async function fetchMovies() {
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (response.status !== 404) {
                    let newMovieList = [];
                    for (let i = 0; i < data.results.length; i++) {
                        const newMovie = {
                            movieId:data.results[i].id, 
                            title:data.results[i].title, 
                            poster:data.results[i].poster_path, 
                            release_date:data.results[i].release_date, 
                            popularity:data.results[i].popularity, 
                            rating:data.results[i].vote_average
                        };
                        newMovieList = [...newMovieList, newMovie];
                    }
                    setMovieList(newMovieList);
                    setLoading(false);
                }
                else {
                    setLoading(false);
                    return <Error />
                }
            }
            catch (error) {
                setLoading(false);
            }
        }
        fetchMovies();
    }, [url])
    
    if (loading) {
        return <Loading />
    }

    return (
        <main>
            <h2>{titles[typeOfMovie]} Movies</h2>
            <section className="movie-list-section">
                {movieList.map((movie) => {
                    const {movieId, title, poster, release_date, popularity, rating} = movie;
                    return (
                        <article className="movie" key={movieId}>
                            <header>
                            <Link to={`/movie/${movieId}`}><img src={`${IMAGE_BASE_URL}w154${poster}`} alt={title}/></Link>
                                <h5><Link to={`/movie/${movieId}`}>{title}</Link></h5>
                            </header>
                            <div className="movie-info">
                                <p>Released {release_date}</p>
                                <p>Popularity: {popularity}</p>
                                <p>{rating}</p>
                            </div>
                        </article>
                    );
                })}
            </section>
            {typeOfMovie === "trending" || 
                <div className="page-selector">
                    {pageNumber === 1 || <button type="button" className="page-btn" onClick={() => togglePage("back")}>Back</button>}
                    <h5>{pageNumber}</h5>
                    <button type="button" className="page-btn" onClick={() => togglePage("next")}>Next</button>
                </div>
            }
        </main>
    );
}