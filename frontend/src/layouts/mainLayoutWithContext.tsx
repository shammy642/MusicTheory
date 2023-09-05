import { AuthContext } from "@/stateManagement/auth/authContext";
import { UserProgressContext } from "@/stateManagement/userProgress/userProgressContext";
import { authReducer } from "@/stateManagement/auth/authReducer";
import { Navbar } from "@/components/navbar/navbar";
import { Box, Container } from "@mui/material";
import { useReducer, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { userProgressReducer } from "@/stateManagement/userProgress/userProgressReducer";
import { useUserProgressServices } from "@/services/userProgressServices";
import { AuthState } from "@/stateManagement/auth/authTypes";
import { ExercisesContext } from "@/stateManagement/exercises/exercisesContext";
import { exercisesReducer } from "@/stateManagement/exercises/exercisesReducer";
import { useExerciseServices } from "@/services/exerciseServices";
import { exercisesState } from "@/stateManagement/exercises/exercisesTypes";
import { useAuthServices } from "@/services/authServices";




export const MainLayoutWithContext = () => {
    console.log("MainLayout Rendering...")
    const [authState, authDispatch] = useReducer(authReducer, initialAuthState());
    const [userProgressState, userProgressDispatch] = useReducer(userProgressReducer, { completedExercises: [] });
    const [exercisesState, exercisesDispatch] = useReducer(exercisesReducer, { exercises: [] });

    return (
        <ExercisesContext.Provider value={[exercisesState, exercisesDispatch]}>
            <AuthContext.Provider value={[authState, authDispatch]}>
                <UserProgressContext.Provider value={[userProgressState, userProgressDispatch]}>
                    <Content authState={authState} exercisesState={exercisesState} />
                </UserProgressContext.Provider>
            </AuthContext.Provider >
        </ExercisesContext.Provider>
    )
}

type contentProps = {
    authState: AuthState;
    exercisesState: exercisesState
}

const Content = ({ authState, exercisesState }: contentProps) => {
    console.log("Content Rendering...")
    const userServices = useUserProgressServices();
    const exerciseServices = useExerciseServices();
    const authServices = useAuthServices();

    useEffect(() => {
        if (!exercisesState.exercises) {
            exerciseServices.getAllExercises()
        }
    }, [exercisesState.exercises])

    useEffect(() => {
        if (authState.isAuthenticated) {
            userServices.getCompletedExercises();
        } else if (!authState.isAuthenticated) {
            userServices.clearUserProgressState();
        }
    }, [authState.isAuthenticated]);

    useEffect(() => {
        if (authState.tokenExpiryTime) {
            authServices.handleAccessTokenExpiry(authState.tokenExpiryTime)
        }
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
    let authState = { isAuthenticated: false, user: null, token: null, email: null, tokenExpiryTime: null };

    if (savedAuthState) {
        const parsedAuthState = JSON.parse(savedAuthState);
        if (parsedAuthState.tokenExpiryTime > Date.now()) {
            authState = {
                isAuthenticated: true,
                user: parsedAuthState.user,
                token: parsedAuthState.token,
                email: parsedAuthState.email,
                tokenExpiryTime: parsedAuthState.tokenExpiryTime
            }
        } else {
            localStorage.removeItem('authState')
        }
    }

    return authState
}