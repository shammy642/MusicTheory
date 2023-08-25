import { useAuth } from "@/auth/useAuth";
import { useAuthServices } from "@/services/authServices";
import { Button, Stack, Typography } from "@mui/material"


export const Profile = () => {
    const { logout } = useAuthServices();
    const [state, dispatch] = useAuth();
    
    const handleLogOut = () => {
        logout();
        dispatch({ type: "LOGOUT" })
    }
    
    return (
        <Stack spacing={3} display="flex" alignItems="center" >
            <Typography textTransform={"capitalize"}>{ state.user }</Typography>
            <Typography>Email: </Typography>
            <Typography>Stars: </Typography>
            <Button color="inherit" onClick={handleLogOut}>Logout</Button>
        </Stack>)
}

