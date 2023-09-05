import { AuthAction, AuthState } from "./authTypes";

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      if (state.isAuthenticated) {
        return state;
      }
      return { isAuthenticated: true, user: action.user, token: action.token, email: action.email, tokenExpiryTime: action.tokenExpiryTime };
    case 'LOGOUT':
      if (!state.isAuthenticated) {
        return state;
      }
      return { isAuthenticated: false, user: null, token: null, email: null, tokenExpiryTime: null };
    default:
      return state;
  }
}