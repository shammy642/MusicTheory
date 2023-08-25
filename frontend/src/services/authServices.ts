import { useAuth } from "@/auth/authContext"

type loginServiceProps = {
    username: string,
    password: string
}
type registerServiceProps = {
    username: string,
    password: string,
    email: string
}

const databaseUrl = 'http://localhost:3000';

export const useAuthServices = () => {
    const [state, dispatch] = useAuth();

    const login = async ({ username, password }: loginServiceProps) => {

        try {
            const response = await fetch(`${databaseUrl}/login`, {
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

            if (response.status !== 200) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('authState', JSON.stringify({ token: data.accessToken, user: data.username, email: data.email }));
            dispatch({ type: "LOGIN", token: data.accessToken, user: data.username, email: data.email });

        }
        catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        localStorage.removeItem('authState')
    }

    const register = async ({ username, password, email }: registerServiceProps) => {

        try {
            const response = await fetch(`${databaseUrl}/createUser`, {
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
                    console.log("breakpoint: account created")
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
            // return { registered: false, message: error };
        }
    }
    return {
        login, logout, register
    }

}
