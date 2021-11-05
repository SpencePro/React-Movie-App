import React from "react";
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
            <div className="table-container">
                <table>
                    <tbody  className="movie-section">
                    <tr>
                        <th>TITLE</th>
                        <th>RELEASED</th>
                        <th>RATING</th>
                        <th>USER RATING</th>
                    </tr>
                    {movieRatings.map((movie) => {
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
                </table>
            </div>
        </main>
    )
}