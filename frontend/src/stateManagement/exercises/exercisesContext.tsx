import { Dispatch, createContext } from 'react';
import { exercisesAction, exercisesState } from './exercisesTypes';

export const ExercisesContext = createContext<[exercisesState, Dispatch<exercisesAction>] | undefined>(undefined)