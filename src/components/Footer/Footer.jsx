import React from "react";
import "./Footer.css";
import GitHubIcon from "../../images/github_icon.svg";
import FacebookIcon from "../../images/fb_icon.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__text">
        &copy; {currentYear} Supersite, Powered by News Api
      </p>
       <nav className="footer__nav">
        <ul className="footer__link-list">
          <li className="footer__link">
            <Link to="/" className="footer__button footer__button--home">
              Home
            </Link>
          </li>
          <li className="footer__link">
            <a
              href="https://tripleten.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__button footer__button--tripleten"
            >
              TripleTen
            </a>
          </li>
        </ul>
        <ul className="footer__icon-list">
          <li className="footer__icon">
            <a
              href="https://github.com/Natalia2311"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__icon-link"
            >
              <img src={GitHubIcon} alt="GitHub" className="footer__icon-image" />
            </a>
          </li>
          <li className="footer__icon">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__icon-link"
            >
              <img
                src={FacebookIcon}
                alt="Facebook"
                className="footer__icon-image"
              />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};


export default Footer;
