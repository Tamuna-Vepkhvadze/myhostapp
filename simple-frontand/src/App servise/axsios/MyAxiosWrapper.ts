import axios from "axios"


export const MyAxiosWrapper = axios.create({
    baseURL:"http://localhost:5000",
    headers: {
        "Content-Type":"application/json",
        "x-api-key": "mysecret123",   
        "Authorization": "Bearer <JWT>" 
    }
})


 





export const bookUrl = axios.create({
  baseURL: "https://openlibrary.org",
  headers: {
    "User-Agent": "BookExplorer/1.0 (contact: user@example.com)",
  },
});

