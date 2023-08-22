import { useAuth } from "@/auth/authContext";
import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react"

export const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [state, dispatch] = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login', {
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
            localStorage.setItem('authState', JSON.stringify({token: data.accessToken, user: data.username}));
            
            dispatch({ type: "LOGIN", token: data.accessToken, user: data.username });
        }
        catch (error) {
            setErrorMessage(errorMessage);
        }
    }


    return (<div>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        label="Name"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>

                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <Button type="submit">Login</Button>
                </div>
                {/* {errorMessage && <p>{errorMessage}</p>} */}
            </form>
    </div>)

}