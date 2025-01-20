import React from "react";
import "./Main.css";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";


function Main({
  handleSaveArticle,
  savedArticles,
  isLoggedIn,
  filteredArticles,
  isLoading,
  searchQuery,
}) {
  return (
    <main className="main">
      {isLoading ? (
        <Preloader />
      ) : (
        <section className="card_section">
          {filteredArticles.length > 0 ? (
            <NewsCardList
              articles={filteredArticles}
              handleSaveArticle={handleSaveArticle}
              savedArticles={savedArticles}
              isLoggedIn={isLoggedIn}
            />
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
