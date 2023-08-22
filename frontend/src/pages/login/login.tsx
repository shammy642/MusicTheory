import { useAuth } from "@/auth/authContext";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react"
import { Navigate } from "react-router-dom";

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
            localStorage.setItem('authState', JSON.stringify({ token: data.accessToken, user: data.username }));

            dispatch({ type: "LOGIN", token: data.accessToken, user: data.username });
        }
        catch (error) {
            setErrorMessage(errorMessage);
        }
    }



    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Box>
                    <TextField
                        label="Name"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        margin={"normal"}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        margin={"normal"}
                    />
                </Box>
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                    <Button type="submit">Login</Button>
                </Box>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </Box>
    )

}