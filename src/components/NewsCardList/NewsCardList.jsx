import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";
import { useState } from "react";

const NewsCardList = ({ articles, isLoggedIn, savedArticles, handleSaveArticle, isSavedNewsPage }) => {
  const [visible, setVisible] = useState(3);

  const showMoreItems = () => {
    setVisible(visible + 3);
  };

  return (
    <section 
      className={`news-card-list ${
      isSavedNewsPage ? "news-card-list--saved" : "news-card-list--main"
    }`}>
      {!isSavedNewsPage && <h2 className="card-list__title">Search results</h2>}
      {articles.length === 0 ? null : (
        <ul className="card-list__articles">
          {articles.slice(0, visible).map((article, index) => (
            <NewsCard
            key={article.id || index} 
              article={article}
              id={article.id}
              url={article.url}
              title={article.title}
              author={article.author}
              source={article.source}
              isLoggedIn={isLoggedIn}
              isSavedNewsPage={isSavedNewsPage}
              handleSaveArticle={handleSaveArticle}
              savedArticles={savedArticles || []}
             
            />
          ))}
        </ul>
      )}
      {visible < articles.length && (
        <button className={`show-more-button ${isSavedNewsPage ? "show-more-button--saved" : ""}`} onClick={showMoreItems}>
          Show more
        </button>
      )}
    </section>
  );
};
export default NewsCardList;

