import "./MobileMenu.css";
import { Link } from "react-router-dom";
import mobile_close from "../../images/mobile_close.svg";
import logoutwhite from "../../images/logoutwhite.svg";


function MobileMenu({ isOpen, onClose, isLoggedIn, onLogOut, onSignInClick, currentUser }) {
  if (!isOpen) return null;

  return (
    <div className="mobile-menu-overlay">
      <div className="mobile-menu">
        <div className="mobile-menu__container">
          <ul className="mobile-menu__nav-list">
            <li className="mobile-menu__item">
              <Link 
              
              className="mobile-menu__logo"
               to="/" onClick={onClose}>
                NewsExplorer
              </Link>
            </li>
            <li className={`mobile-menu__item ${isOpen ? "open" : ""}`}>
              <button className="mobile-menu__close-button" onClick={onClose}>
                <img
                  src={mobile_close}
                  alt="Close button"
                  className="header__menu-close"
                />
              </button>
            </li>
          </ul>
          <div className="mobile-menu__container-content">
            <Link className="mobile-menu__home" to="/" onClick={onClose}>
              Home
            </Link>
            {isLoggedIn ? (
              <>
            
                <Link
                  className="mobile-menu__saved"
                  to="/saved-news"
                  onClick={onClose}
                >
                  Saved Articles
                </Link>

                   <div className="mobile__username">
                  <button
                    type="button"
                    className="mobile-button__logout"
                    onClick={onLogOut}
                  >
                    {currentUser?.name || "Natalia"}
                    <img
                      src={logoutwhite}
                      className="button-logout-icon"
                      alt="Logout Icon"
                    />
                  </button>
                </div>
              </>
            ) : (
              <button
              className="mobile-menu__signin"
              onClick={onSignInClick}
            >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;



