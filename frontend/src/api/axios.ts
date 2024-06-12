import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY
const BD_URL = import.meta.env.VITE_BD_URL

type InstanceType = {
    credential: boolean
}

const instance = ({ credential }: InstanceType) => {
    return axios.create({
        baseURL: BD_URL,
        withCredentials: credential,
        headers: {
            'Content-Type': 'application/json',
            'apikey': API_KEY,
        }
    })
}


export default instance