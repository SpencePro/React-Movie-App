import React from "react";
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <img src="#" alt="Site Logo" />
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/">HOME</Link>
                    <span className="line-below"></span>
                </li>
                <li>
                    <Link to="/watchlist">WATCHLIST</Link>
                    <span className="line-below"></span>
                </li>
                <li>
                    <Link to="/rated_movies">RATED MOVIES</Link>
                    <span className="line-below"></span>
                </li>
                
            </ul>
        </nav>
    );
}