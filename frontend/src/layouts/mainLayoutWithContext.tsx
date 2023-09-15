import { AuthContext } from "@/stateManagement/auth/authContext";
import { UserProgressContext } from "@/stateManagement/userProgress/userProgressContext";
import { authReducer } from "@/stateManagement/auth/authReducer";
import { Navbar } from "@/components/navbar/navbar";
import { Box, Container } from "@mui/material";
import { useReducer, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { userProgressReducer } from "@/stateManagement/userProgress/userProgressReducer";
import { useUserProgressServices } from "@/services/userProgressServices";
import { AuthState } from "@/stateManagement/auth/authTypes";
import { QuizesContext } from "@/stateManagement/quizes/quizesContext";
import { quizesReducer } from "@/stateManagement/quizes/quizesReducer";
import { useQuizServices } from "@/services/quizServices";
import { quizesState } from "@/stateManagement/quizes/quizesTypes";
import { useAuthServices } from "@/services/authServices";

export const MainLayoutWithContext = () => {
    const [authState, authDispatch] = useReducer(authReducer, initialAuthState());
    const [userProgressState, userProgressDispatch] = useReducer(userProgressReducer, { completedQuizes: [] });
    const [quizesState, quizesDispatch] = useReducer(quizesReducer, { quizes: [] });

    return (
        <QuizesContext.Provider value={[quizesState, quizesDispatch]}>
            <AuthContext.Provider value={[authState, authDispatch]}>
                <UserProgressContext.Provider value={[userProgressState, userProgressDispatch]}>
                    <Content authState={authState} quizesState={quizesState} />
                </UserProgressContext.Provider>
            </AuthContext.Provider >
        </QuizesContext.Provider>
    )
}

type contentProps = {
    authState: AuthState;
    quizesState: quizesState
}

const Content = ({ authState }: contentProps) => {
    const userServices = useUserProgressServices();
    const exerciseServices = useQuizServices();
    const authServices = useAuthServices();

    useEffect(() => {
            exerciseServices.getAllQuizes()
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (authState.isAuthenticated) {
            userServices.getCompletedQuizes();
        } else if (!authState.isAuthenticated) {
            userServices.clearUserProgressState();
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState.isAuthenticated]);

    useEffect(() => {
        if (authState.tokenExpiryTime) {
            authServices.handleAccessTokenExpiry(authState.tokenExpiryTime)
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box>
            <Navbar />
            <Container>
                <Box marginTop={4}>
                    <Outlet />
                </Box>
            </Container>
        </Box>
    );
};

const initialAuthState = () => {
    const savedAuthState = localStorage.getItem("authState");
    let authState = { isAuthenticated: false, userName: null, token: null, emailAddress: null, tokenExpiryTime: null };

    if (savedAuthState) {
        const parsedAuthState = JSON.parse(savedAuthState);
        if (parsedAuthState.tokenExpiryTime > Date.now()) {
            authState = {
                isAuthenticated: true,
                userName: parsedAuthState.userName,
                token: parsedAuthState.token,
                emailAddress: parsedAuthState.emailAddress,
                tokenExpiryTime: parsedAuthState.tokenExpiryTime
            }
        } else {
            localStorage.removeItem('authState')
        }
    }

    return authState
}