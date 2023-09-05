import { createContext, Dispatch } from 'react';
import { AuthAction, AuthState } from './authTypes';

export const AuthContext = createContext<[AuthState, Dispatch<AuthAction>] | undefined>(undefined);
