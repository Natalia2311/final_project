import React from "react";
import "./Main.css";
import About from "../About/About";
import { defaultArticles } from "../../utils/constants";
import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";
import { useLocation } from "react-router-dom";


function Main({ handleSaveArticle, savedArticles, isLoggedIn }) {
  
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";
  
  const handleSearch = (keyword) => {
    setSearchQuery(keyword); // Save the search query

    if (!keyword) {
      setFilteredArticles([]); // Clear articles if no keyword is provided
      return;
    }

    setIsLoading(true); // Start loading when search begins
    setTimeout(() => {
      // Simulate an API call with a delay
      const filtered = defaultArticles.filter((article) =>
        article.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredArticles(filtered); // Update articles
      setIsLoading(false); // End loading
    }, 1500); // Simulate 1.5s API delay
  };
  return (
    <main className="main">
      <SearchForm handleSearch={handleSearch} />
      {isLoading ? ( 
        <Preloader />
      ) : (
        <section  className={`card_section ${
          isSavedNewsPage ? "card_section--saved" : ""
        }`}>
          {filteredArticles.length > 0 ? (
            <NewsCardList
             articles={filteredArticles}
             handleSaveArticle={handleSaveArticle}
             savedArticles={savedArticles}  
             isLoggedIn={isLoggedIn}/>
          ) : (
            searchQuery && <NotFound />
          )}
        </section>
      )}
      
      <About />
    </main>
  );
}

export default Main;