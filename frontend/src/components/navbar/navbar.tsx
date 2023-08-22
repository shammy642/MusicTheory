import { useAuth } from "@/auth/authContext";
import { Login } from "@/pages/login/login";
import { AppBar, Box, Button, Container, Dialog, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [state, dispatch] = useAuth();

    const handleClickOpen = () => {
        setLoginDialogOpen(true);
    };

    const handleClickClose = () => {
        setLoginDialogOpen(false);
    };
    const navigate = useNavigate()

    const handleLogOut = () => {
        dispatch({type: "LOGOUT"})
    }

    useEffect(() => {
        if (loginDialogOpen) {
            setLoginDialogOpen(false)}
    }, [state])
    
    return (
        <AppBar component="nav" position="static" sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
            <Container>
                <Toolbar>
                    <Box width="100%" display="flex" justifyContent="space-between">
                        <Typography variant="h6" component="div" sx={{ cursor: "pointer" }} onClick={() => navigate('/contents-page')}>
                            Learn Music Theory!
                        </Typography>
                        {state.isAuthenticated ? 
                        <Box>
                            {state.user}
                            <Button color="inherit" onClick={handleLogOut}>Logout</Button>
                        </Box>
                        :
                        <Box>
                            <Button color="inherit" onClick={() => navigate('/register')} >Register</Button>
                            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
                        </Box>
                        }
                    </Box>
                    
                </Toolbar>
                <Dialog open={loginDialogOpen} onClose={handleClickClose}>
                    <Login />
                </Dialog>
                
            </Container>
        </AppBar>
    )
}