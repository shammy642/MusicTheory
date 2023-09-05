import { useAuth } from "@/stateManagement/auth/useAuth";
import { Button, Container, Stack, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"

export const Congratulations = () => {
    const navigate = useNavigate();
    const [authState] = useAuth();

    return (
        <React.Fragment>
            <Stack spacing={3} display="flex" alignItems="center" >
                <Typography variant="h3">Congratulations! </Typography>
                {authState.isAuthenticated ? <Typography variant="h5">You have gained 1 star.</Typography> : ""}
                <Button onClick={() => navigate("/contents-page")}></Button>
            </Stack>
        </React.Fragment>)
}