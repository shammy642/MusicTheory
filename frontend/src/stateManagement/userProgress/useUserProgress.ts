import { useContext } from "react";
import { UserProgressContext } from "./userProgressContext";

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error("useUserProgress must be used within an userProgressProvider.");
  }
  return context;
}