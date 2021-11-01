import React, { useState } from "react";
import { HomeImage } from "./home-image";
import { MovieList } from "./movie-list";
import { FilterMovies } from "./filter-movies";
import { useGlobalContext } from "./context";

export const Home = () => {
    return (
        <>
        <div className="home-image">
            <HomeImage />
        </div>
        <div className="filter-results">
            <FilterMovies />
        </div>
        <div className="movie-list">
            <MovieList />
        </div>
        </>
    );
}

