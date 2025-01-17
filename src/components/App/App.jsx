import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./App.css";
import auth from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import { useState, useEffect } from "react";
import RegisterModal from "../RegisterModal/RegisterModal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterSuccess from "../RegisterSuccess/RegisterSuccess";
import SavedNews from "../SavedNews/SavedNews";
import ProtectedRoute from "../ProtectedRoute.jsx";
import CurrentUserProvider from "../../contexts/CurrentUserContext.jsx";
import api from "../../utils/api.jsx";
import { defaultArticles } from "../../utils/constants";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedArticles, setSavedArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginModal = (email, password) => {
    auth
      .login({ email, password })
      .then((res) => {
        console.log(res);
        if (res) {
          localStorage.setItem("token", res);

          auth.checkToken(res).then((data) => {
            setCurrentUser(data.user); // Set the user data
            setIsLoggedIn(true); // Set the user as logged in
            handleCloseModal();
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegisterModal = (name, email, password) => {
    auth
      .createUser({ name, email, password })
      .then((res) => {
        console.log(res);

        setActiveModal("RegistrationCompleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          console.log("Token valid:", res.data);
          setCurrentUser(res.data);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Token invalid or expired:", error);
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const handleSaveArticle = ({ id, isSaved }) => {
    const token = localStorage.getItem("token");

    if (!isSaved) {
      auth
        .saveArticleItem(id, token)
        .then((res) => {
          setSavedArticles((prev) => [...prev, { id, ...res.data }]);
        })
        .catch((err) => console.error("Error saving article:", err));
    } else {
      auth
        .unsaveArticleItem(id, token)
        .then(() => {
          setSavedArticles((prev) =>
            prev.filter((article) => article.id !== id)
          );
        })
        .catch((err) => console.error("Error unsaving article:", err));
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .getSavedArticles(token)
        .then((data) => setSavedArticles(data.articles || []))
        .catch((err) => console.error("Failed to fetch saved articles:", err));
    }
  }, []);

  const handleOpenLoginModal = () => {
    setActiveModal("login");
  };

  const handleOpenSighupModal = () => {
    setActiveModal("signup");
  };
  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

 

  const handleSearch = (keyword) => {
    setSearchQuery(keyword);
  
    if (!keyword) {
      setFilteredArticles([]); 
      return;
    }
  
    setIsLoading(true);
  
    api
      .searchArticles(keyword) 
      .then((articles) => {
        const articlesWithIds = articles.map((article) => ({
          ...article,
          id: article.id,
        }));
        setFilteredArticles(articlesWithIds);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setFilteredArticles([]); 
      })
      .finally(() => {
        setIsLoading(false);
      }, 1500);
  };

  return (
    <CurrentUserProvider isLoggedIn={isLoggedIn} value={{ currentUser }}>
   
        <div className="page">
          <Header
            onCreateModal={handleCreateModal}
            handleOpenLoginModal={handleOpenLoginModal}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            handleSearch={handleSearch}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  filteredArticles={filteredArticles}
                  isLoading={isLoading}
                  searchQuery={searchQuery}
                  handleSaveArticle={handleSaveArticle}
                  savedArticles={savedArticles}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedNews
                    handleSaveArticle={handleSaveArticle}
                    isLoggedIn={isLoggedIn}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          {activeModal === "login" && (
            <LoginModal
              handleOpenLoginModal={handleOpenLoginModal}
              handleCloseModal={handleCloseModal}
              handleOpenSignupModal={handleOpenSighupModal}
              onSubmit={handleLoginModal}
            />
          )}
          {activeModal === "signup" && (
            <RegisterModal
              handleOpenSighupModal={handleOpenSighupModal}
              handleCloseModal={handleCloseModal}
              onSubmit={handleRegisterModal}
              handleOpenLoginModal={handleOpenLoginModal}
            />
          )}
          {activeModal === "RegistrationCompleted" && (
            <RegisterSuccess
              handleCloseModal={handleCloseModal}
              handleOpenLoginModal={handleOpenLoginModal}
            />
          )}
        </div>

    </CurrentUserProvider>
  );
}
export default App;
