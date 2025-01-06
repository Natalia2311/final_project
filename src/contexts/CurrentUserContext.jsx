
  import React, { useState } from "react";
import { savedArticles as initialSavedArticles } from "../utils/constants";

const CurrentUserContext = React.createContext();

export { CurrentUserContext };

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    name: "Natalia",
    savedArticles: initialSavedArticles, // Initialize savedArticles from constants
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Define isLoggedIn state

  const removeSavedArticle = (id) => {
    setCurrentUser((prev) => ({
      ...prev,
      savedArticles: prev.savedArticles.filter((article) => article.id !== id),
    }));
  };

  return (
    <CurrentUserContext.Provider value={{ ...currentUser, isLoggedIn, removeSavedArticle }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;