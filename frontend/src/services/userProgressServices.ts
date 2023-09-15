import { useUserProgress } from "@/stateManagement/userProgress/useUserProgress";
import { DATABASEURL } from "./config";
import { useAuth } from "@/stateManagement/auth/useAuth";
import { quizProps } from "@/stateManagement/quizes/quizesTypes";

export const useUserProgressServices = () => {
    const [state, dispatch] = useUserProgress();
    const [authState] = useAuth();

    const getCompletedQuizes = async () => {
        if (authState.isAuthenticated) {
            try {
                const response = await fetch(`${DATABASEURL}/completeQuizes`, {
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
                const completedQuizIds = data.completedQuizes.map((completedQuizes: quizProps) => completedQuizes)
                dispatch({ type: "SET_COMPLETED_QUIZES", quizIds: completedQuizIds })
            } catch (err) {
                console.log(err)
            }
        }
        else {
            console.log("Not authenticated. Not fetching completed exercises")
        }

    }
    const clearUserProgressState = () => {
        dispatch({ type: "SET_COMPLETED_QUIZES", quizIds: [] });
    }

    const postCompletedQuiz = async (quizId: number) => {
        let starGained = false as boolean;

        try {
            const response = await fetch(`${DATABASEURL}/completeQuiz`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + authState.token
                },
                body: JSON.stringify({
                    quizId: quizId
                })
            })
            if (response.ok) {
                if (!state.completedQuizes.includes(quizId)){
                    dispatch({ type: "SET_COMPLETED_QUIZES", quizIds: [...state.completedQuizes, quizId] })
                    starGained = true
                }
            }
        }
        catch (err) {
            console.log(err)
        }

        return starGained
    }

    return { getCompletedQuizes, clearUserProgressState, postCompletedQuiz }
}