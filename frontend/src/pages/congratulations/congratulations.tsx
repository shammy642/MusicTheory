import { useAuth } from "@/stateManagement/auth/useAuth";
import { Stack, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const Congratulations = () => {
    const navigate = useNavigate();
    const [authState] = useAuth();
    const { hasGainedStar } = useParams();
    const hasGainedStarBool = (hasGainedStar === 'true')

    useEffect(()=> {
        setTimeout(() => {
            navigate('/contents-page')
        }, 3000);
    }, [navigate])

    return (
        <React.Fragment>
            <Stack spacing={3} display="flex" alignItems="center" >
                <Typography variant="h3">Congratulations! </Typography>
                {(authState.isAuthenticated && hasGainedStarBool) && <Typography variant="h5">You have gained 1 star.</Typography>}
            </Stack>
        </React.Fragment>)
}