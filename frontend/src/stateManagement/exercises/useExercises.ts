import { useContext } from "react";
import { ExercisesContext } from "./exercisesContext";

export const useExercises = () => {
  const context = useContext(ExercisesContext);
  if (!context) {
    throw new Error("useExercises must be used within an exercisesProvider.");
  }
  return context;
}