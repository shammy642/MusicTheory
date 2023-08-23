import { createContext, useContext, Dispatch } from 'react';
import { AuthAction, AuthState } from './authTypes';

export const AuthContext = createContext<[AuthState, Dispatch<AuthAction>] | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider.");
    }
    return context;
  };