import { useContext } from "react";
import { QuizesContext } from "./quizesContext";

export const useQuizes = () => {
  const context = useContext(QuizesContext);
  if (!context) {
    throw new Error("useExercises must be used within an exercisesProvider.");
  }
  return context;
}