import axios from "./axios"
import { FormLogin, } from "../types"
const endpointLogin = "/auth/login"
const endpointSignUp = "/auth/register"

export const loginRequest = async (data: FormLogin) => {
    return await axios.post(endpointLogin, data)
}
export const registerRequest = async (data: any) => {
    return await axios.post(endpointSignUp, data)
}

