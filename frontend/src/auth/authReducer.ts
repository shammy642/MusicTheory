import { AuthAction, AuthState } from "./authTypes";

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, isAuthenticated: true, user: action.user, token: action.token };
      case 'LOGOUT':
        return { ...state, isAuthenticated: false, user: null, token: null };
      default:
        return state;
    }
  }