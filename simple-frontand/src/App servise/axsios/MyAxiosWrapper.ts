import axios from "axios"


export const MyAxiosWrapper = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "mysecret123"
  }
});

MyAxiosWrapper.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
});

 
export const api = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
});


