import { useContext } from "react";
import NewsCardList from "../NewsCardList/NewsCardList";
import "./SavedNews.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React from "react";
import { useLocation } from "react-router-dom";

const SavedNews = ({ isLoggedIn, handleSaveArticle }) => {
  const { name, savedArticles } = useContext(CurrentUserContext);
  const location = useLocation();

  const isSavedNewsPage = location.pathname === "/saved-news";

  const keywords = [
    ...new Set(savedArticles.map((article) => article.keyword)),
  ];
  const keywordsText =
    keywords.length > 2
      ? `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} others`
      : keywords.join(", ");

  if (!isLoggedIn) {
    return <p>Please log in to view saved articles.</p>;
  }

  return (
    <div className="saved-news">
      <div className="saved-news__header">
        <h1 className="saved-news__title">Saved articles</h1>
        <p className="saved-news__summary">
          {name}, you have {savedArticles?.length || 0} saved articles
        </p>
        <p className="saved-news__keywords">
          By keywords: <strong>{keywordsText}</strong>
        </p>
      </div>

      <NewsCardList
        articles={savedArticles || []}
        isLoggedIn={isLoggedIn}
        isSavedNewsPage={isSavedNewsPage}
        handleSaveArticle={handleSaveArticle}
      />
    </div>
  );
};

export default SavedNews;
