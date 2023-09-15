import { useAuthServices } from "@/services/authServices";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";

export const RegisterAccount = () => {
    const [userName, setUserName] = useState<string>('');
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { login, register } = useAuthServices();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!userName || !emailAddress || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (userName.length > 50) {
            setError('Username is too long.');
            return;
        }

        if (emailAddress.length > 100) {
            setError('Email address is too long.');
            return;
        }

        if (password.length < 8 || password.length > 50) {
            setError('Password should be between 8 and 50 characters.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);
        const result = await register({ userName, password, emailAddress });
        if (result) {
            if (result.registered) {
                setTimeout(() => login({ userName, password }), 1500);
                setIsLoading(false);
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
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        margin={"dense"}
                        sx={{ width: "100%" }}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Email address"
                        type="email"
                        value={emailAddress}
                        onChange={e => setEmailAddress(e.target.value)}
                        margin={"dense"}
                        sx={{ width: "100%" }}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        margin={"dense"}
                        sx={{ width: "100%" }}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Confirm password"
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        margin={"dense"}
                        sx={{ width: "100%" }}
                    />
                </Box>
                <Box display={"flex"} justifyContent={"center"} margin={2}>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} /> : "Register"}
                    </Button>
                </Box>
                {error && (
                    <Typography color="error" align="center">
                        {error}
                    </Typography>
                )}
            </form>
        </Box>
    )
}
