import { useAuthServices } from "@/services/authServices";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react"

export const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login } = useAuthServices()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login({ username, password })
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
                        value={username}
                        onChange={e => setUsername(e.target.value)}
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
            </form>
        </Box>
    )

}