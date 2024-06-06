import instance from "./axios"
import { FormLogin, } from "../types"

const BD_URL = import.meta.env.VITE_BD_URL
const endpoint = "/auth/register"

export const loginRequest = async (user: FormLogin) => {
    instance.post('/auth/login', user)
}
export const registerRequest = async (data: any) => {

    try {
        console.log("Enviando datos a:", BD_URL + endpoint);
        console.log("Datos enviados:", JSON.stringify(data, null, 2));

        const response = await instance.post(endpoint, data)

        console.log("Respuesta recibida:", response.data);
        return response.data
    } catch (error: any) {
        if (error.response) {
            console.error("Error en la respuesta:", error.response.data);
            console.error("Código de error:", error.response.status);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {
            console.error("No se recibió respuesta:", error.request);
        } else {
            console.error("Error en la solicitud:", error.message);
        }
        throw error;
    }

}