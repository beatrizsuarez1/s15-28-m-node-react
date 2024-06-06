import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY
const BD_URL = import.meta.env.VITE_BD_URL

const instance = axios.create({
    baseURL: BD_URL,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        ['apikey']: API_KEY,
    }
})

export default instance;