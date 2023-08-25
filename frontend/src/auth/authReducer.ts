import { AuthAction, AuthState } from "./authTypes";

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
      case 'LOGIN':
        return { isAuthenticated: true, user: action.user, token: action.token, email: action.email };
      case 'LOGOUT':
        return { isAuthenticated: false, user: null, token: null, email: null };
      default:
        return state;
    }
  }