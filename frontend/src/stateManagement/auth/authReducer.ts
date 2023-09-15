import { AuthAction, AuthState } from "./authTypes";

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      if (state.isAuthenticated) {
        return state;
      }
      return { isAuthenticated: true, userName: action.userName, token: action.token, emailAddress: action.emailAddress, tokenExpiryTime: action.tokenExpiryTime };
    case 'LOGOUT':
      if (!state.isAuthenticated) {
        return state;
      }
      return { isAuthenticated: false, userName: null, token: null, emailAddress: null, tokenExpiryTime: null };
    default:
      return state;
  }
}