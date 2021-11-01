import React, { useState } from "react";
import { useGlobalContext } from "./context";

export const RatingForm = (movieId) => {
    const nums = Array.from({length: 10}, (x, i) => i + 1);
    const {rateMovies} = useGlobalContext();
    const handleSelect = (e) => {
        console.log(movieId);
        rateMovies(e.target.value, movieId.id, movieId.title, movieId.release_date, movieId.rating);
    }

    return (
        <form className="score-form">
            <label htmlFor="">Rate the movie: </label>
            <select name="score" onChange={handleSelect}>
                <option value="" default></option>
                {nums.map((num) => {
                return (
                    <option value={num} key={num}>{num}</option>
                )
            })}
        </select>
    </form>
    )
}