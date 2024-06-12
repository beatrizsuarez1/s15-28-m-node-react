import axios from "./axios"
import { FormLogin, } from "../types"

const endpointLogin = "/auth/login"
const endpointSignUp = "/auth/register"
const endpointProjets = "/project"


const axiosWithOutCredentials = axios({ credential: false });
const axiosWithCredentials = axios({ credential: true });

// RUTAS PARA INICIAR SESIÓN Y REGISTRARSE

export const loginRequest = async (data: FormLogin) => {
    return await axiosWithOutCredentials.post(endpointLogin, data)
}
export const registerRequest = async (data: any) => {
    return await axiosWithOutCredentials.post(endpointSignUp, data)
}

// RUTAS DE PROYECTOS CON CREDENCIAL

export const projectsRequest = async () => {
   return  await axiosWithCredentials.get(endpointProjets)
    
}