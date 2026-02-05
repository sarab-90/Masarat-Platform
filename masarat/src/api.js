import axios from "axios";
const token = localStorage.getItem("token")
// connect to backend
const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}`:"", 
    }
});
export default api;