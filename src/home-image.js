import React from "react";
import { useGlobalContext } from "./context";
import { Search } from "./search"
import { Link } from 'react-router-dom';

export const HomeImage = () => {
    const {bannerImage, homePageImageUrl, homePageImageId } = useGlobalContext();
    document.addEventListener("DOMContentLoaded", function() {
        bannerImage();
    })
    return (
        <div className="home-img" style={{backgroundImage: "url("+ homePageImageUrl +")", backgroundAttachment: "fixed"}}>
            <Link to={`/movie/${homePageImageId}`}/>
            <div>
                <Search />
            </div>
        </div>
    );
}