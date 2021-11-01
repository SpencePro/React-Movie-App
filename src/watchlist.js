import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./context";
import { Link } from 'react-router-dom';

export const Watchlist = () => {
    const {watchlist, movieRatings, toggleWatchlist} = useGlobalContext();
    
    if (watchlist.length === 0) {
        return (
            <main className="watchlist">
                <h2>Watchlist is Empty</h2>
                <h5>Go check out some movies!</h5>
            </main>
        )
    }
    return (
        <main className="watchlist">
            <h2>Watchlist</h2>
            <div className="movie-section">
                {watchlist.map((movie) => {
                    const {id, title, release_date, rating} = movie;
                    const rated = movieRatings.find((movie) => movie.id === parseInt(id));
                    return (
                        <article className="movie-element" key={id}>
                            <h5><Link to={`/movie/${id}`}>{title}</Link></h5>
                            <span className="text-divider"></span>
                            <p>{release_date}</p>
                            <span className="text-divider"></span>
                            <p>Community Rating: {rating}</p>
                            <span className="text-divider"></span>
                            <p>Your Rating: {rated ? `${rated.score}`:"N/A"}</p>
                            <span className="text-divider"></span>
                            <button className="btn" type="button" onClick={()=>toggleWatchlist(id, title, release_date, rating)}>REMOVE</button>
                        </article>
                    )
                })}
            </div>
        </main>
    );
}