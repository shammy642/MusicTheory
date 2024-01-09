import { useAuth } from "@/stateManagement/auth/useAuth"
import jwt_decode from "jwt-decode";

type loginServiceProps = {
    userName: string,
    password: string
}
type registerServiceProps = {
    userName: string,
    password: string,
    emailAddress: string
}

type jwt = {
    userName: string;
    userId: number;
    emailAddress: string;
    iat: number;
    exp: number;
}

export const useAuthServices = () => {
    const [, authDispatch] = useAuth();
    const login = async ({ userName, password }: loginServiceProps) => {

        try {
            const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/login`, {
                method: "POST",
                body: JSON.stringify({
                    name: userName,
                    password: password
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });
            const data = await response.json();
            const decodedJwt = jwt_decode(data.accessToken) as jwt
            const tokenExpiryTime = decodedJwt.exp*1000
            if (response.status !== 200) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('authState', JSON.stringify({ token: data.accessToken, userName: decodedJwt.userName, emailAddress: decodedJwt.emailAddress, tokenExpiryTime: tokenExpiryTime }));
            authDispatch({ type: "LOGIN", token: data.accessToken, userName: decodedJwt.userName, emailAddress: decodedJwt.emailAddress, tokenExpiryTime: tokenExpiryTime });
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

    const register = async ({ userName, password, emailAddress }: registerServiceProps) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/createUser`, {
                method: "POST",
                body: JSON.stringify({
                    userName: userName,
                    emailAddress: emailAddress,
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
