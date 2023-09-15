import { DATABASEURL } from "./config"
import { useQuizes } from "@/stateManagement/quizes/useQuizes";


export const useQuizServices = () => {
    const [, quizDispatch] = useQuizes();

    const getAllQuizes= async () => {
        
        try {
            const response = await fetch(`${DATABASEURL}/quizes`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json()
            quizDispatch({type: "SET_ALL_QUIZES", quizes: data.quizes })
        }
        catch (error) {
            console.log(error)
        }
    }

    return { getAllQuizes }
}