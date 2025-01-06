import React from "react";
import "./SearchForm.css";
import { useState } from "react";
import { useForm } from "react-hook-form";


const SearchForm = ({ handleSearch }) => {
  const [keyword, setKeyword] = useState('');

const {
  register,
  handleSubmit,
  formState: { errors },
  getValues
} = useForm();



const handleSearchSubmit = () => {
  const { keyword } = getValues();
  handleSearch(keyword);
};

const handleKeywordChange = (event) => {
  setKeyword(event.target.value);
};
  
  return (
    <div className="searchForm" >
      <section className="searchForm__container">
        <h1 className="searchForm__title">What's going on in the world?</h1>
        <p className="searchForm__description">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <div className="searchForm__searchbar">
          <input
          
           onChange={handleKeywordChange}
            className="searchForm__searchbar-input"
            id="searchForm-search"
            type="text"
            name="keyword"
            placeholder="Enter Topic"
            {...register("keyword")}
          />

           {errors.keyword && (
            <p className="searchForm__invalid">{errors.keyword.message}</p>
          )} 

          <button type="submit" className="searchForm__submit" onClick={handleSubmit(handleSearchSubmit)}>
            Search
          </button>
        </div>
      </section>
    </div>
  );
};

export default SearchForm;




