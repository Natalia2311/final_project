const baseUrl = "http://localhost:3001";

export const handleResponse = (data) =>
  Promise.resolve({ ok: true, json: () => Promise.resolve(data) });

const fakeUser = {
  name: "Natalia",
  email: "www@gmail.com",
  id: "fake-id",
};

export const checkToken = (token) => {
  const url = `${baseUrl}/users/me`;
  console.log(`Making a request to: ${url}`);
  return Promise.resolve({
    res: fakeUser,
  });
};

export const createUser = ({ name, avatar, email, password }) => {
  const url = `${baseUrl}/signup`;
  console.log(`Making a request to: ${url}`);
  return Promise.resolve({
    data: { name, avatar, email, password },
  });
};

export const login = (email, password) => {
  const url = `${baseUrl}/auth/login`;
  console.log(`Making a request to: ${url}`);
  return Promise.resolve({ token: "a fake token", email, password });
};

export const saveArticleItem = (id, token) => {
  const url = `${baseUrl}/savedArticles`;
  console.log(`Fetching saved articles from: ${url}`);
  return Promise.resolve({
    data: { id, saved: true },
  });
};

export const unsaveArticleItem = (id, token) => {
  const url = `${baseUrl}/savedArticles`;
  console.log(`Fetching saved articles from: ${url}`);
  return Promise.resolve({
    data: { id, saved: false },
  });
};

const auth = {
  checkToken,
  login,
  createUser,
  saveArticleItem,
  unsaveArticleItem,
};

export default auth;
