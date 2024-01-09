import { useAuth } from "@/stateManagement/auth/useAuth";
import { Login } from "@/pages/login/login";
import { Profile } from "@/pages/profile/profile";
import { RegisterAccount } from "@/pages/registerAccount/registerAccount";
import { AppBar, Box, Button, Container, Dialog, Link, Paper, Stack, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popup } from "../popup/popup";
import StarRateIcon from '@mui/icons-material/StarRate';
import { useUserProgress } from "@/stateManagement/userProgress/useUserProgress";

export const Navbar = () => {
    const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
    const [displayLogin, setDisplayLogin] = useState<boolean>(true)
    const [authState] = useAuth();
    const [userProgressState] = useUserProgress();


    const handleClickOpen = (id: "register" | "login") => {
        (id === "register") ? setDisplayLogin(false) : setDisplayLogin(true)
        setLoginDialogOpen(true);
    };

    const handleClickClose = () => {
        setLoginDialogOpen(false);
    };
    const navigate = useNavigate()

    useEffect(() => {
        if (loginDialogOpen) {
            setLoginDialogOpen(false)
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState])

    return (
        <AppBar component="nav" position="static" sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
            <Container>
                <Toolbar>
                    <Box width="100%" display="flex" justifyContent="space-between" alignItems={"center"}>
                        <Typography variant="h6" component="div" sx={{ cursor: "pointer" }} onClick={() => navigate('/')}>
                            MUSIC THEORY for Young Children
                        </Typography>
                        {authState.isAuthenticated ?
                            <Box>
                                <Popup button={
                                    <Stack direction="row" spacing={1} display="flex" alignItems="center">
                                        <Typography>{authState.userName}</Typography>
                                        <StarRateIcon fontSize="large"/>{userProgressState.completedQuizes?.length}
                                    </Stack> 
                                }>
                                    <Profile />
                                </Popup>
                            </Box>
                            :
                            <Box>
                                <Button color="inherit" onClick={() => handleClickOpen("register")}>Register</Button>
                                <Button color="inherit" onClick={() => handleClickOpen("login")}>Login</Button>
                            </Box>
                        }
                    </Box>
                </Toolbar>

                <Dialog open={loginDialogOpen} onClose={handleClickClose}>
                    <Paper elevation={24} >
                        <Box padding={4}>
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