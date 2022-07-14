import { AuthData } from "./authData";

export type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
};
    