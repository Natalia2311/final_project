import React from 'react';
import menu from "../../images/menu.svg";
import "./MenuIcon.css";

const MenuIcon = ({ onClick }) => (
  <div className="menu-icon" onClick={onClick}>
   <img src={menu} alt="Menu Icon" className="header__menu-icon" />
  </div>
);

export default MenuIcon;

 