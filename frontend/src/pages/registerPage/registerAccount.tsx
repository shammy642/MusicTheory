import { Box, Button, TextField } from "@mui/material"
import { useState } from "react";

export const RegisterAccount = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    return (
        <Box>
            <form>
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
                    <Button type="submit">Register</Button>
                </Box>
            </form>
        </Box>
    )
}