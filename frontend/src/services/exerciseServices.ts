import { DATABASEURL } from "./config"
import { useExercises } from "@/stateManagement/exercises/useExercises";


export const useExerciseServices = () => {
    const [exercisesState, exercisesDispatch] = useExercises();

    const getAllExercises = async () => {
        
        try {
            const response = await fetch(`${DATABASEURL}/allExercises`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json()
            exercisesDispatch({type: "SET_ALL_EXERCISES", exercises: data.allExercises })
            
        }
        catch (error) {
            console.log(error)
        }
    }

    return { getAllExercises }
}