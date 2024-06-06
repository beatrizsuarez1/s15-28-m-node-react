// import { useNavigate } from "react-router-dom"
import { registerRequest, loginRequest } from "../api/auth";
import { FormLogin, FormRegister, useRequestType } from "../types";
import { useAuth } from "../context/auth-context";



const useRequest = (): useRequestType => {
     
    // const navigate = useNavigate();
    const { isLoggedIn, login, logout} = useAuth()

    const loginUser = async (data: FormLogin): Promise<void> => {
        try {
            const response = await loginRequest(data)
            console.log(response)
            login()
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const registerUser = async (data: FormRegister): Promise<void> => {
        try {
            const response = await registerRequest(data)
            console.log(response)
            login()
        } catch (error: any) {
            console.log(error.message)
        }
    }
    return { loginUser, registerUser }
}
export default useRequest