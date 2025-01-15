import "./Header.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import logoutwhite from "../../images/logoutwhite.svg";
import logoutblack from "../../images/logoutblack.svg";
import { useLocation } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useState } from "react";
import MenuIcon from "../MenuIcon/MenuIcon";
import SearchForm from "../SearchForm/SearchForm";

const Header = ({
  handleOpenLoginModal,
  isLoggedIn,
  handleLogout,
  handleSearch,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
 

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleSignInClick = () => {
    handleOpenLoginModal();
    setMobileMenuOpen(false);
    setIsHidden(true);
  };

  
  return (
    <nav
      className={`header ${
        isSavedNewsPage ? "header--saved-news" : "header--main"
      }`}
    >
      <div className="header__bar">
        <div>
          <h1
            className={`header__bar-logo ${
              location.pathname === "/final_project/" ? "header__bar-logo--main" : ""
            } ${isMobileMenuOpen ? "header__bar-logo--hidden" : ""}`}
          >
            NewsExplorer
          </h1>
        </div>
        <div className="header__bar-buttons">
          <Link
            to="/final_project/"
            className={`header__bar-button-home ${
              location.pathname === "/final_project/" ? "header__bar-button-home--main" : ""
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
                    src={isSavedNewsPage ? logoutblack : logoutwhite}
                    className="button-logout-icon"
                    alt="Logout Icon"
                  />
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={handleSignInClick}
              className="header__bar-button-signin"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
      {!isSavedNewsPage && <SearchForm handleSearch={handleSearch} />}

      {!isMobileMenuOpen && (
        <div className={`menu-icon ${!isHidden ? "menu-icon--hidden" : ""}`}>
          <MenuIcon onClick={toggleMobileMenu} />
        </div>
      )}

      {isMobileMenuOpen && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={toggleMobileMenu}
          isLoggedIn={isLoggedIn}
          onLogOut={handleLogout}
          currentUser={currentUser}
          onSignInClick={handleSignInClick}
        />
      )}
    </nav>
  );
};

export default Header;
