import { savedArticles } from "./constants";

const baseUrl = "http://localhost:3001";

const getSavedArticles = (token) => {
    const url = `${baseUrl}/saved-articles`; // Replace with your actual endpoint
    console.log(`Fetching saved articles from: ${url}`);
  
    return Promise.resolve({ articles: savedArticles });
  };



const api = { getSavedArticles };

export default api;