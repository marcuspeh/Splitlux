import React, {createContext, useState, useContext, useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import { AuthData } from '../models/authData';
import { AuthContextData } from '../models/authContextData';
import { AuthService } from '../service/authService';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}: any) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await EncryptedStorage.getItem('@AuthData');

      if (authDataSerialized) {
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
        // Do nothing
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (email: string, password: string) => {
    const _authData = await AuthService.signIn(email, password);

    setAuthData(_authData);
    EncryptedStorage.setItem('@AuthData', JSON.stringify(_authData));
  };

  const signOut = async () => {
    setAuthData(undefined);
    await EncryptedStorage.removeItem('@AuthData');
  };

  return (
    <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};


function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth};