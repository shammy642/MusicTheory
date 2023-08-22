import { AuthAction, AuthState } from "./authTypes";

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
      case 'LOGIN':
        return { isAuthenticated: true, user: action.user, token: action.token };
      case 'LOGOUT':
        return { isAuthenticated: false, user: null, token: null };
      default:
        return state;
    }
  }