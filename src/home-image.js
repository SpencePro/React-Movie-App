import React from "react";
import { useGlobalContext } from "./context";
import { Search } from "./search"

export const HomeImage = () => {
    // fetch to url for random image from api to display prominently; change on each render
    const {bannerImage, homePageImageUrl} = useGlobalContext();
    document.addEventListener("DOMContentLoaded", function() {
        bannerImage();
    })
    return (
        <div className="home-img" style={{backgroundImage: "url("+ homePageImageUrl +")", backgroundAttachment: "fixed", backgroundPosition: "50%"}}>
            <div>
                <Search />
            </div>
        </div>
    );
}