import React from "react";
import "./Main.css";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";
import { useLocation } from "react-router-dom";



function Main({   handleSaveArticle,
  savedArticles,
  isLoggedIn,
  filteredArticles,
  isLoading,
  searchQuery }) {
  
  
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";
  
  return (
    <main className="main" >
      
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