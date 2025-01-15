import React from "react";
import "./SearchForm.css";
import { useForm } from "react-hook-form";

const SearchForm = ({ handleSearch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const handleSearchSubmit = () => {
    if (!handleSearch) {
      console.error("handleSearch is not provided to SearchForm");
      return;
    }

    const keyword = getValues("keyword");
    if (keyword.trim()) {
      handleSearch(keyword);
    } else {
      alert("Please enter a valid keyword.");
    }
  };

  return (
    <div className="searchForm">
      <section className="searchForm__container">
        <h1 className="searchForm__title">What's going on in the world?</h1>
        <p className="searchForm__description">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <div className="searchForm__searchbar">
          <input
            className="searchForm__searchbar-input"
            id="searchForm-search"
            type="text"
            name="keyword"
            placeholder="Enter Topic"
            {...register("keyword", {
              required: "Keyword is required",
              validate: (value) =>
                value.trim() !== "" || "Keyword cannot be empty",
            })}
          />
          {errors.keyword && (
            <p className="searchForm__invalid">{errors.keyword.message}</p>
          )}

          <button
            type="submit"
            className="searchForm__submit"
            onClick={handleSubmit(handleSearchSubmit)}
          >
            Search
          </button>
        </div>
      </section>
    </div>
  );
};

export default SearchForm;
