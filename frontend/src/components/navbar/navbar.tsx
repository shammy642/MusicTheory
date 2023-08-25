import { useAuth } from "@/auth/authContext";
import { Login } from "@/pages/login/login";
import { Profile } from "@/pages/profile/profile";
import { RegisterAccount } from "@/pages/registerAccount/registerAccount";
import { useAuthServices } from "@/services/authServices";

import { AppBar, Box, Button, Container, Dialog, Link, Paper, Stack, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popup } from "../popup/popup";
import userEvent from "@testing-library/user-event";
import React from "react";
import StarRateIcon from '@mui/icons-material/StarRate';

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

    useEffect(() => {
        if (loginDialogOpen) {
            setLoginDialogOpen(false)
        }
    }, [state])

    return (
        <AppBar component="nav" position="static" sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
            <Container>
                <Toolbar>
                    <Box width="100%" display="flex" justifyContent="space-between" alignItems={"center"}>
                        <Typography variant="h6" component="div" sx={{ cursor: "pointer" }} onClick={() => navigate('/contents-page')}>
                            Learn Music Theory!
                        </Typography>
                        {state.isAuthenticated ?
                            <Box>
                                <Popup button={
                                    <Stack direction="row" spacing={1} display="flex" alignItems="center">
                                        <Typography>{state.user}</Typography>
                                        <Typography><StarRateIcon fontSize="large"/>{}</Typography>
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