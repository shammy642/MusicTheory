export type AuthState = {
    isAuthenticated: boolean;
    user: string | null;
    token: string | null;
    email: string | null;
    tokenExpiryTime: number | null;
  };
  
export type AuthAction =
    { type: 'LOGIN'; user: string; token: string; email: string, tokenExpiryTime: number } | { type: 'LOGOUT' };