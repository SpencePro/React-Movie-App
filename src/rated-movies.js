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
    // let data = [];
    
    // for (let i = 0; i < watchlist.length; i++) {
    //     const rated = movieRatings.find((movie) => watchlist[i].id === parseInt(movie.id));
    //     const newEntry = {
    //         id:watchlist[i].id,
    //         title:watchlist[i].title, 
    //         release_date:watchlist[i].release_date, 
    //         rating:watchlist[i].rating,
    //         user_rating: rated ? `${rated.score}`:"N/A",
    //         remove_button: "true"
    //     };
    //     data = [...data, newEntry];
    // }

    return (
        <main className="movie-ratings">
            <h2>Rated Movies</h2>
            <div className="table-container">
                <table>
                    <div className="movie-section">
                        <tbody>
                        <tr>
                            <th>TITLE</th>
                            <th>RELEASED</th>
                            <th>RATING</th>
                            <th>USER RATING</th>
                        </tr>
                        {movieRatings.map((movie) => {
                            console.log(movie);
                            const {id, title, release_date, rating, score} = movie;
                            return (
                                <tr className="movie-element" key={id}>
                                    <td><Link to={`/movie/${id}`}>{title}</Link></td>
                                    <td>{release_date}</td>
                                    <td>{rating}</td>
                                    <td>{score}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </div>
                </table>
            </div>
        </main>
    )
}