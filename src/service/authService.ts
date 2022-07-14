import { AuthData } from "../models/authData";

const JWTTokenMock =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikx1Y2FzIEdhcmNleiIsImlhdCI6MTUxNjIzOTAyMn0.oK5FZPULfF-nfZmiumDGiufxf10Fe2KiGe9G5Njoa64';

const signIn = (email: string, _password: string): Promise<AuthData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: JWTTokenMock,
        email: email,
        name: 'Lucas Garcez',
      });
    }, 1000);
  });
};
  
export const AuthService = {
  signIn,
};