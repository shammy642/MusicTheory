export type AuthState = {
    isAuthenticated: boolean;
    user: any | null;
    token: string | null;
  };
  
export type AuthAction =
    { type: 'LOGIN'; user: string; token: string } | { type: 'LOGOUT' };