import { useAuth } from "@/stateManagement/auth/useAuth"
import { DATABASEURL } from "./config"
import jwt_decode from "jwt-decode";

type loginServiceProps = {
    username: string,
    password: string
}
type registerServiceProps = {
    username: string,
    password: string,
    email: string
}

type jwt = {
    user: string;
    userId: number;
    iat: number;
    exp: number;
}

export const useAuthServices = () => {
    const [authState, authDispatch] = useAuth();

    const login = async ({ username, password }: loginServiceProps) => {

        try {
            const response = await fetch(`${DATABASEURL}/login`, {
                method: "POST",
                body: JSON.stringify({
                    name: username,
                    password: password
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });
            const data = await response.json();
            const decodedJwt = <jwt>jwt_decode(data.accessToken)
            const tokenExpiryTime = decodedJwt.exp*1000
            if (response.status !== 200) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('authState', JSON.stringify({ token: data.accessToken, user: data.username, email: data.email, tokenExpiryTime: tokenExpiryTime }));
            authDispatch({ type: "LOGIN", token: data.accessToken, user: data.username, email: data.email, tokenExpiryTime: tokenExpiryTime });
            handleAccessTokenExpiry(tokenExpiryTime)
        }
        catch (err) {
            console.log(err)
        }
    }


    const handleAccessTokenExpiry = (tokenExpiryTime: number) => {
            const logoutTimerDuration = tokenExpiryTime - Date.now();
            setTimeout(() => {
                logout();
            }, logoutTimerDuration);
    }

    const logout = () => {
        localStorage.removeItem('authState')
        authDispatch({ type: "LOGOUT" })
    }

    const register = async ({ username, password, email }: registerServiceProps) => {

        try {
            const response = await fetch(`${DATABASEURL}/createUser`, {
                method: "POST",
                body: JSON.stringify({
                    name: username,
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });
            const data = await response.json();


            switch (response.status) {
                case 201:
                    return { registered: true, message: "Account created" };
                case 400:
                    throw new Error(data.message || "Bad Request: The server could not understand the request.");
                case 401:
                    throw new Error(data.message || "Unauthorized: You need to authenticate before registering.");
                case 403:
                    throw new Error(data.message || "Forbidden: You do not have permission to register.");
                case 409:
                    throw new Error(data.message || "Conflict: Username already be in use.");
                case 500:
                    throw new Error(data.message || "Internal Server Error: Something went wrong on our end.");
                default:
                    throw new Error(data.message || "Registration failed. Try again later");
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    return {
        login, logout, register, handleAccessTokenExpiry
    }

}
