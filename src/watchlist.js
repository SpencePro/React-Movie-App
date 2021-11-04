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
    let data = [];
    
    for (let i = 0; i < watchlist.length; i++) {
        const rated = movieRatings.find((movie) => watchlist[i].id === parseInt(movie.id));
        const newEntry = {
            id:watchlist[i].id,
            title:watchlist[i].title, 
            release_date:watchlist[i].release_date, 
            rating:watchlist[i].rating,
            user_rating: rated ? `${rated.score}`:"N/A",
            remove_button: "true"
        };
        data = [...data, newEntry];
    }

    return (
        <main className="watchlist">
            <h2>Watchlist</h2>
            <div className="table-container">
                <table>
                    <div className="movie-section">
                        <tbody>
                        <tr>
                            <th>TITLE</th>
                            <th>RELEASED</th>
                            <th>RATING</th>
                            <th>USER RATING</th>
                            <th>REMOVE</th>
                        </tr>
                        {data.map((movie) => {
                            console.log(movie);
                            const {id, title, release_date, rating, user_rating} = movie;
                            return (
                                <tr className="movie-element" key={id}>
                                    <td><Link to={`/movie/${id}`}>{title}</Link></td>
                                    <td>{release_date}</td>
                                    <td>{rating}</td>
                                    <td>{user_rating}</td>
                                    <td><button className="btn" type="button" onClick={()=>toggleWatchlist(id, title, release_date, rating)}>REMOVE</button></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </div>
                </table>
            </div>
        </main>
    );
}