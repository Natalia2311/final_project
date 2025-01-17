import "./NewsCard.css";
import React, { useState } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const NewsCard = ({
  article,
  isSavedNewsPage,
  handleSaveArticle,
  isLoggedIn,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { removeSavedArticle } = useContext(CurrentUserContext);

  const [isSaved, setIsSaved] = useState(article.saved || false);

  const handleSave = () => {
    if (!isLoggedIn) {
      setIsHovered(true);
      return;
    }

    setIsSaved((prevState) => !prevState);

    handleSaveArticle({ id: article.id, isSaved: !isSaved });
  };

  const handleRemove = () => {
    removeSavedArticle(article.id);
  };

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("default", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const handleMouseEnterRemoveButton = () => {
    setIsHovered(true);
  };

  const handleMouseLeaveRemoveButton = () => {
    setIsHovered(false);
  };

  return (
    <li className="card__container">
      <div className="card__image">
        <img
          src={article.urlToImage || article.url}
          alt={article.title}
          className="card__image"
        />

        {!isSavedNewsPage && (
          <div
            className={`card__bookmark ${
              isSaved ? "card__bookmark_active" : ""
            }`}
            onMouseEnter={() => !isLoggedIn && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleSave}
          >
            <button
              className="bookmark-button"
              aria-label={isSaved ? "Unsave article" : "Save article"}
            />
            {!isLoggedIn && isHovered && (
              <span className="bookmark-tip">Sign in to save articles</span>
            )}
          </div>
        )}

        {isSavedNewsPage ? (
          <div
            className="news-card__remove-button-container"
            onMouseEnter={handleMouseEnterRemoveButton}
            onMouseLeave={handleMouseLeaveRemoveButton}
          >
            <button
              className="news-card__remove-button"
              aria-label="Remove article"
              onClick={handleRemove}
            />
            {isHovered && (
              <span className="news-card__remove-button-tip">
                Remove from saved
              </span>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>

      {isSavedNewsPage && (
        <span className="news-card__keyword">{article.keyword}</span>
      )}

      <div className="card__text-container">
        <p className="card__date">{formattedDate}</p>
        <h3 className="card__title">{article.title}</h3>
        <p className="card__text">{article.description}</p>
        <p className="card__source">{article.source?.name || "Unknown Source"}</p>
      </div>
    </li>
  );
};
export default NewsCard;
