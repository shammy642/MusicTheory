import { useAuth } from "@/auth/authContext";
import { Login } from "@/pages/login/login";
import { RegisterAccount } from "@/pages/registerPage/registerAccount";
import { AppBar, Box, Button, Container, Dialog, Link, Paper, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
    const [displayLogin, setDisplayLogin] = useState<boolean>(true)
    const [state, dispatch] = useAuth();

    const handleClickOpen = (id: "register" | "login") => {
        (id == "register") ? setDisplayLogin(false) : setDisplayLogin(true)
        setLoginDialogOpen(true);
    };

    const handleClickClose = () => {
        setLoginDialogOpen(false);
    };
    const navigate = useNavigate()

    const handleLogOut = () => {
        dispatch({ type: "LOGOUT" })
    }

    useEffect(() => {
        if (loginDialogOpen) {
            setLoginDialogOpen(false)
        }
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
                                <Button color="inherit" onClick={() => handleClickOpen("register")} >Register</Button>
                                <Button color="inherit" onClick={() => handleClickOpen("login")}>Login</Button>
                            </Box>
                        }
                    </Box>

                </Toolbar>
                <Dialog open={loginDialogOpen} onClose={handleClickClose}>
                    <Paper elevation={24} >
                        <Box padding={5}>
                            <Container>
                            {displayLogin ? 
                                <div>
                                    <Login />
                                    <Typography paddingRight={1} display={"inline-block"}>Don't have an account?</Typography> 
                                    <Link onClick={() => setDisplayLogin(!displayLogin)} sx={{ cursor: "pointer" }}>Register</Link>
                                </div>
                                :
                                <div>
                                    <RegisterAccount />
                                    <Typography paddingRight={1} display={"inline-block"}>Already have an account?</Typography>
                                    <Link onClick={() => setDisplayLogin(!displayLogin)} sx={{ cursor: "pointer" }}>Sign in</Link>
                                </div>
                            }
                            </Container>
                        </Box>
                    </Paper>

                </Dialog>

            </Container>
        </AppBar>
    )
}