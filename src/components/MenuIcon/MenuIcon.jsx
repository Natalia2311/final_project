import React from 'react';
import menu from "../../images/menu.svg";
import menu_black from "../../images/menu_black.svg";
import "./MenuIcon.css";
import { useLocation } from "react-router-dom";

 

const MenuIcon = ({ onClick }) => {
  const location = useLocation(); // Move useLocation inside the component
  const isSavedNewsPage = location.pathname === "/saved-news";

  return (
    <div className="menu-icon" onClick={onClick}>
      <img
        src={isSavedNewsPage ? menu_black : menu} // Dynamically select icon
        className="header__menu-icon"
        alt="Menu Icon"
      />
    </div>
  );
};

export default MenuIcon;

 