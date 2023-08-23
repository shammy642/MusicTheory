import { AuthContext } from "@/auth/authContext";
import { authReducer } from "@/auth/authReducer";
import { Navbar } from "@/components/navbar/navbar";
import { Box, Container } from "@mui/material";
import { parse } from "path";
import { useReducer } from "react";
import { Outlet } from "react-router-dom";

export const MainLayoutWithContext = () => {
    let savedState = localStorage.getItem("authState");
    let initialState;
    
    if (savedState) {
        let parsedState = JSON.parse(savedState);
        console.log(parsedState)
        initialState = { isAuthenticated: true, user: parsedState.user, token: parsedState.token };
        console.log("initialState:", initialState)
    } else {
        initialState = { isAuthenticated: false, user: null, token: null };
    }
    
    const [state, dispatch] = useReducer(authReducer, initialState);
    
    
    
    return (
        <AuthContext.Provider value={[state, dispatch]}>
            <Box>
                <Navbar />
                <Container>
                    <Box marginTop={4}>
                        <Outlet />
                    </Box>
                </Container>
            </Box>
        </AuthContext.Provider>
    )
}