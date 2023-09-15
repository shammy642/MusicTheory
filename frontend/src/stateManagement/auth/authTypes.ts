export type AuthState = {
    isAuthenticated: boolean;
    userName: string | null;
    token: string | null;
    emailAddress: string | null;
    tokenExpiryTime: number | null;
  };
  
export type AuthAction =
    { type: 'LOGIN'; userName: string; token: string; emailAddress: string, tokenExpiryTime: number } | { type: 'LOGOUT' };