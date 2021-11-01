import React, { useEffect } from "react";
import { useGlobalContext } from "./context";

export const FilterMovies = () => {
    const {setPageNumber, setTypeOfMovie} = useGlobalContext();
    const filterStart = (filter) => {
        setPageNumber(1);
        setTypeOfMovie(filter);
    }
    return (
        <>
        <h4>Display Options</h4>
        <main className="sorting-options">
            <div className="top-rated">
                <button onClick={() => filterStart("top_rated")}>Top Rated</button>
            </div>
            <div className="popular">   
                <button onClick={() => filterStart("popular")}>Most Popular</button>
            </div>
            <div className="trending">
                <button onClick={() => filterStart("trending")}>Trending</button>
            </div>
        </main>
        </>
    );
}