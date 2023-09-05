import { useAuth } from "@/stateManagement/auth/useAuth";
import { useAuthServices } from "@/services/authServices";
import { useUserProgress } from "@/stateManagement/userProgress/useUserProgress";
import { Button, Stack, Typography } from "@mui/material"


export const Profile = () => {
    const { logout } = useAuthServices();
    const [ authState ] = useAuth();
    const [ userProgressState ] = useUserProgress();

    
    return (
        <Stack spacing={3} display="flex" alignItems="center" >
            <Typography textTransform={"capitalize"}>{ authState.user }</Typography>
            <Typography>{ authState.email }</Typography>
            <Typography>Stars: {userProgressState.completedExercises?.length}</Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
        </Stack>)
}

