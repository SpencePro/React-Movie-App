import React from "react";
import { Link } from 'react-router-dom'
import { useGlobalContext } from "./context";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

export const Navbar = () => {
    const {websiteTheme, setWebsiteTheme} = useGlobalContext();
    return (
        <nav>
            <div className="logo">
            <Link to="/"><img src="#" alt="Site Logo" /></Link>
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
                <li>
                    {websiteTheme === "dark" ? 
                    <HiOutlineSun style={{color:"white"}} onClick={()=>setWebsiteTheme("light")} />
                    :
                    <HiOutlineMoon onClick={()=>setWebsiteTheme("dark")} />
                    }
                </li>
            </ul>
        </nav>
    );
}