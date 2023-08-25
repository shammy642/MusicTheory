export type AuthState = {
    isAuthenticated: boolean;
    user: any | null;
    token: string | null;
    email: string | null;
  };
  
export type AuthAction =
    { type: 'LOGIN'; user: string; token: string; email: string } | { type: 'LOGOUT' };