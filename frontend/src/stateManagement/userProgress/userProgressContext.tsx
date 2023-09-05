import { Dispatch, createContext } from 'react';
import { userProgressAction, userProgressState } from "./userProgressTypes";

export const UserProgressContext = createContext<[userProgressState, Dispatch<userProgressAction>] | undefined>(undefined);