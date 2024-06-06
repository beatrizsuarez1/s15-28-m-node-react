import { useNavigate } from "react-router-dom"
import { registerRequest, loginRequest } from "../api/auth";
import { FormLogin, FRWithoutConfirm, useRequestType } from "../types";
import { useAuth } from "../context/auth-context";



const useRequest = (): useRequestType => {

    const navigate = useNavigate();
    const { isLoggedIn, login, logout } = useAuth()

    const loginUser = async (data: FormLogin): Promise<void> => {
        console.log(data)
        try {
            const response = await loginRequest(data)
            console.log(response)
            login()
            navigate('/dashboard')
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const registerUser = async (data: FRWithoutConfirm): Promise<void> => {

        console.log(data)
        try {

            const response = await registerRequest(data)
            console.log(response.data)
            login()
            navigate('/dashboard')
        } catch (error: any) {
            console.log(error.message)
        }
    }
    return { loginUser, registerUser }
}
export default useRequest