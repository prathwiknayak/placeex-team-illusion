import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // backend base URL
});

// Experience endpoints
export const getExperiences = () => API.get("/users");
export const addExperience = (data) => API.post("/users/add", data);

export default API;
