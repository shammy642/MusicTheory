import { useUserProgress } from "@/stateManagement/userProgress/useUserProgress";
import { DATABASEURL } from "./config";
import { useAuth } from "@/stateManagement/auth/useAuth";
import { exercisesProps } from "@/stateManagement/exercises/exercisesTypes";

export const useUserProgressServices = () => {
    const [state, dispatch] = useUserProgress();
    const [authState] = useAuth();

    const getCompletedExercises = async () => {
        if (authState.isAuthenticated) {
            try {
                const response = await fetch(`${DATABASEURL}/completeExercises`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + authState.token
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                const completedExerciseIds = data.completedExercises.map((completedExercises: exercisesProps) => completedExercises.exerciseId)
                dispatch({ type: "SET_COMPLETED_EXERCISES", exerciseIds: completedExerciseIds })

            } catch (err) {
                console.log(err)
            }
        }
        else {
            console.log("Not authenticated. Not fetching completed exercises")
        }

    }
    const clearUserProgressState = () => {
        dispatch({ type: "SET_COMPLETED_EXERCISES", exerciseIds: [] });
    }

    const postCompletedExercise = async (exerciseId: number) => {
        try {
            const response = await fetch(`${DATABASEURL}/completeExercise`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + authState.token
                },
                body: JSON.stringify({
                    exerciseId: exerciseId
                })
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    return { getCompletedExercises, clearUserProgressState, postCompletedExercise }
}