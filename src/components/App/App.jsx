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
//import { savedArticles } from "../../utils/constants.jsx";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedArticles, setSavedArticles] = useState([]);

  const handleLoginModal = (email, password) => {
    auth
      .login({ email, password })  // Calls the login function
      .then((res) => {
        console.log(res);
        if (res) {
          localStorage.setItem("token", res); 
           // Save the token
          auth.checkToken(res).then((data) => {
            setCurrentUser(data.user);  // Set the user data
            setIsLoggedIn(true);  // Set the user as logged in
            handleCloseModal();  // Close the modal
            
          });
        }
      })
      .catch((err) => {
        console.error(err);  // Handle errors here
      });
  };

  const handleRegisterModal = (name, email, password) => {
    auth
      .createUser({ name, email, password })
      .then((res) => {
        console.log(res);
        // setIsLoggedIn(true);
        // setCurrentUser(res.data);
        setActiveModal("RegistrationCompleted"); // Show success modal
     
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
          setCurrentUser(res.data); ;
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
    const token = localStorage.getItem("token"); // Correctly retrieve the token
    
    if (!isSaved) {
      auth
        .saveArticleItem(id, token)
        .then((res) => {
          setSavedArticles((prev) => [...prev, { id, ...res.data }]); // Add the article to saved articles
        })
        .catch((err) => console.error("Error saving article:", err));
    } else {
      auth
        .unsaveArticleItem(id, token)
        .then(() => {
          setSavedArticles((prev) => prev.filter((article) => article.id !== id)); // Remove the article
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

  return (
    <CurrentUserProvider isLoggedIn={isLoggedIn}  value={{ currentUser }}
    >
    <Router>
      <div className="page">
        <Header
          onCreateModal={handleCreateModal}
          handleOpenLoginModal={handleOpenLoginModal}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
          <Routes>
          <Route path="/" element={<Main 
          handleSaveArticle={handleSaveArticle}
          savedArticles={savedArticles} 
          isLoggedIn={isLoggedIn}/>} />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews 
                handleSaveArticle={handleSaveArticle}
                isLoggedIn={isLoggedIn} />
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
    </Router>
    </CurrentUserProvider>
  );
};
export default App;


