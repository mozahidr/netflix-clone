import React, { useState, useEffect } from 'react';
import "./Nav.css";
import logo from "../images/logo.png";
import avatar from "../images/avatar.png";
import { useNavigate } from 'react-router-dom';

export const Nav = () => {
    const navigate = useNavigate();
    const [show, handleShow] = useState(false);

    const transitionNavBar = () => {
        window.scrollY > 100 ? handleShow(true) : handleShow(false);
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, [])

  return (
    <div className={`nav ${show && "nav__black"}`}>
        <div className='nav__contents'>
            <img onClick={() => navigate("/")} src={logo} alt="logo" className='nav__logo' />
            <img onClick={() => navigate("/profile")} src={avatar} alt="avatar" className='nav__avatar' />
        </div>
    </div>
  )
}
