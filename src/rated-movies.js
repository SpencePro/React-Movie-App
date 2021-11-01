import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./context";
import { Link } from 'react-router-dom';

export const RatedMovies = () => {
    const {movieRatings} = useGlobalContext();

    if (movieRatings.length === 0) {
        return (
            <main className="movie-ratings">
                <h2>You have not rated any movies yet</h2>
                <h5>Go find some movies and fix that!</h5>
            </main>
        )
    }

    return (
        <main className="movie-ratings">
            <h2>Rated Movies</h2>
            <div className="movie-section">
                {movieRatings.map((movie) => {
                    const {id, score, title, release_date, rating} = movie;
                    return (
                        <article className="movie-element" key={id}>
                            <h5><Link to={`/movie/${id}`}>{title}</Link></h5>
                            <span className="text-divider"></span>
                            <p>{release_date}</p>
                            <span className="text-divider"></span>
                            <p>Community Rating: {rating}</p>
                            <span className="text-divider"></span>
                            <p>Your Rating: {score}</p>
                        </article>
                    )
                })}
            </div>
        </main>
    )
}