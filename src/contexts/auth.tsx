import React, {createContext, useState, useContext, useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import { AuthData } from '../models/data/authData';
import { AuthContextData } from '../models/data/authContextData';
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
        // Test if valid
        const isValid: boolean = await AuthService.verifyToken(_authData.access)
        if (isValid) {
          setAuthData(_authData);
        } else {
          setAuthData(undefined);
          await EncryptedStorage.removeItem('@AuthData');
        }
      }
    } catch (error) {
        // Do nothing
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (email: string, password: string): Promise<boolean> => {
    
    const _authData = await AuthService.signIn(email, password);

    if (_authData.access && _authData.access.length > 0) {
      setAuthData(_authData);
      EncryptedStorage.setItem('@AuthData', JSON.stringify(_authData));
      return true
    }
    return false
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