import axios from "./axios"
import { FormLogin, FormRegister } from "../types"

export const loginRequest = async (user: FormLogin) => {
    axios.post('/auth/login', user)
}
export const registerRequest = async (user: FormRegister) => {
    axios.post('/auth/register', user)
}