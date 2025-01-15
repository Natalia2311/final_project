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
      <nav className="footer__links">
        <ul className="footer__links_description">
          <li className="footer__link">
            <Link to="/final_project/">
              <button className="footer__button-home" type="button">
                Home
              </button>
            </Link>
          </li>
          <li className="footer__link">
            <a
              href="https://tripleten.com/"
              target="_blank"
              className="footer__button-tripleten"
              rel="connect"
            >
              TripleTen
            </a>
          </li>
        </ul>
        <ul className="footer__links_icons">
          <li className="footer__icon">
            <a
              href="https://github.com/Natalia2311"
              target="_blank"
              className="footer__button-github"
              rel="connect"
            >
              <img src={GitHubIcon} alt="GitHub" />
            </a>
          </li>
          <li className="footer__icon">
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="footer__button-facebook"
              rel="connect"
            >
              <img src={FacebookIcon} alt="Facebook" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
