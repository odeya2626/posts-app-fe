import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(
  (config) => {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser == null) {
      localStorage.removeItem("currentUser");
      return config;
    }
    const parsedCurrentUser = JSON.parse(currentUser);
    const accessToken = parsedCurrentUser ? parsedCurrentUser.access_token : "";
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);

    if (error.response.status === 401) {
      if (error?.response?.data?.detail === "Could not validate credentials") {
        error.response.data.detail = "Token has expired, please login again";
      }
      const address = error.response.data.detail
        ? `/?message=${error.response.data.detail}`
        : `/`;

      localStorage.removeItem("currentUser");

      window.location.href = address;
    }
    if (error.response.status === 403) {
      error.response.data.message && alert(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

/* All reqs */
export const login = (user) => api.post(baseURL + "/login", user);
export const register = (user) => api.post(baseURL + "/user/register", user);
export const updateUser = (user) => api.put("/user", user);
export const uploadImage = (image) => api.post("/post/image", image);
export const getPostsPage = (page, limit) =>
  api.get(`/post?page=${page}&limit=${limit}`);
export const addPost = (post) => api.post("/post", post);
export const deletePost = (id) => api.delete(`/post/${id}`);
export const addComment = (comment) => api.post("/comment", comment);
