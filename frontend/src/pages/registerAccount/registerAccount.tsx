import { useAuthServices } from "@/services/authServices";
import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react";


/* TODO
** Display loading icon when awaiting response from API
** Add validation
** Add confirmation password box
** Send email to confirm real account
*/

export const RegisterAccount = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { login, register } = useAuthServices();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const result = await register({ username, password, email });
        if (result) {
            if (result.registered) {
                setTimeout((() => login({username, password})), 1500)
                setIsLoading(false)
            }
        }
    }

    return (
        <Box>
            <Box display={"flex"} justifyContent={"center"} marginBottom={3}>
                <Typography variant="h5" color="primary">Create an account</Typography>
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
                        label="Email address"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
                {/* <Box>
                    <TextField
                        label="Confirm password"
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        margin={"dense"}
                        fullWidth
                    />
                </Box> */}
                <Box display={"flex"} justifyContent={"center"} margin={2}>
                    <Button type="submit">Register</Button>
                </Box>
            </form>
        </Box>
    )
}