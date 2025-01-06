import "./Header.css";
import background from "../../images/background.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import logoutwhite from "../../images/logoutwhite.svg";
import logoutblack from "../../images/logoutblack.svg";
import { useLocation } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useState } from "react";
import MenuIcon from "../MenuIcon/MenuIcon";

const Header = ({ handleOpenLoginModal, isLoggedIn, handleLogout }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isSavedNewsPage ? "header--saved-news" : ""}`}>
      {/* Only show the background image if not on the "saved-news" page */}
      {!isSavedNewsPage && (
        <img
          src={background}
          alt="background"
          className="header__background-image"
        />
      )}
      <div className="header__bar">
        {/* Logo */}
        <div>
          <h1
            className={`header__bar-logo ${
              location.pathname === "/" ? "header__bar-logo--main" : ""
            }`}
          >
            NewsExplorer
          </h1>
        </div>

        {/* Navigation buttons */}
        <div className="header__bar-buttons">
          <Link
            to="/"
            className={`header__bar-button-home ${
              location.pathname === "/" ? "header__bar-button-home--main" : ""
            }`}
          >
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/saved-news"
                className={`header__bar-button-saved ${
                  isSavedNewsPage
                    ? "header__bar-button-saved--black"
                    : "header__bar-button-saved--white"
                }`}
              >
                Saved Articles
              </Link>

              <div className="username">
                <button
                  type="button"
                  className={`button-logout ${
                    isSavedNewsPage
                      ? "button-logout--black"
                      : "button-logout--white"
                  }`}
                  onClick={handleLogout}
                >
                  {currentUser?.name || "Natalia"}
                  <img
                    src={isSavedNewsPage ? logoutblack : logoutwhite} // Conditionally render icon
                    className="button-logout-icon"
                    alt="Logout Icon"
                  />
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={handleOpenLoginModal}
              className="header__bar-button-signin"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
      {/* Render MobileMenu if Open */}

      <MenuIcon onClick={toggleMobileMenu} />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        isLoggedIn={isLoggedIn}
        onLogOut={handleLogout}
        onSignInClick={handleOpenLoginModal}
      />
    </header>
  );
};

export default Header;
