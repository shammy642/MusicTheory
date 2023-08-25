import { Dispatch, createContext, useContext } from 'react';
import { userProgressAction, userProgressState } from "./userProgressTypes";

export const userProgressContext = createContext<[userProgressState, Dispatch<userProgressAction>] | undefined>(undefined);

export const useUserProgress = () => {
    const context = useContext(userProgressContext);
    if (!context) {
      throw new Error("useAuth must be used within an userProgressProvider.");
    }
    return context;
}