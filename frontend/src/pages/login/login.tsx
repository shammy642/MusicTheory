import { useAuthServices } from "@/services/authServices";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react"

export const Login = () => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validationMessage, setValidationMessage] = useState<string | null>(null);
    const { login } = useAuthServices();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!userName || !password) {
            setValidationMessage('Both fields are required.');
            return;
        }
        if (userName.length > 50) {
            setValidationMessage('Username is too long.');
            return;
        }
        if (password.length < 8 || password.length > 50) {
            setValidationMessage('Password should be between 8 and 50 characters.');
            return;
        }

        setValidationMessage(null); 
        login({ userName, password });
    }

    return (
        <Box>
            <Box display={"flex"} justifyContent={"center"} marginBottom={3}>
                <Typography variant="h5" color="primary">Login to your account</Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <Box>
                    <TextField
                        label="Name"
                        type="text"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        margin={"dense"}
                        sx={{width: "100%"}}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        margin={"dense"}
                        sx={{width: "100%"}}
                    />
                </Box>
                <Box display={"flex"} justifyContent={"center"} margin={2}>
                    <Button type="submit">Login</Button>
                </Box>
                {validationMessage && (
                    <Typography color="error" align="center">
                        {validationMessage}
                    </Typography>
                )}
            </form>
        </Box>
    )
}
