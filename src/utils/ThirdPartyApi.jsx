import { handleResponse } from "../utils/auth";

export const APIKey = "bbf9b310100f45e1aa928a364cf42779";

export const BaseUrl = "https://newsapi.org/v2/everything";

export const getSearchResult = async (keyword) => {
  try {
    const response = await fetch(
      `${BaseUrl}?q=${encodeURIComponent(
        keyword
      )}&pageSize=100&sortBy=popularity&apiKey=${APIKey}`
    );
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw new Error(
      "Sorry, something went wrong during the request. Please try again later."
    );
  }
};
