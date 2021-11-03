import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
    return (
        <>
        <footer>
            <p>Created 2021 by Spencer Rodgers</p>
            <p><FaEnvelope/> spencer.a.rodgers@gmail.com</p>
            <p><FaGithub/> <a href="https://github.com/SpencePro" style={{textDecoration:"none"}}>Github</a></p>
        </footer>
        </>
    );
}