
export const APIKey = "bbf9b310100f45e1aa928a364cf42779";

const baseUrl = "https://nomoreparties.co/news/v2/everything";



const api = {

  

  searchArticles: (query) => {
    const url = `${baseUrl}?q=${encodeURIComponent(query)}&apiKey=${APIKey}`;
    console.log(`Searching for articles with query: ${query}`);
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching search results: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => data.articles);
  },


  getSavedArticles: (token) => {
    const url = `${baseUrl}/saved-articles`;
    console.log(`Fetching saved articles from: ${url}`);
    return Promise.resolve({ articles: [] });
  },

  
};

export default api;