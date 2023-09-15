import { Dispatch, createContext } from 'react';
import { quizesAction, quizesState } from './quizesTypes';

export const QuizesContext = createContext<[quizesState, Dispatch<quizesAction>] | undefined>(undefined)