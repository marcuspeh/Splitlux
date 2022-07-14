import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppStack from './appStack';
import AuthStack from './authStack';
import { Loading } from '../componments/loading';
import { useAuth } from '../contexts/auth';

const Router = () => {
  var {authData, loading} = useAuth();

  if (loading) {
    return <Loading />;
  }
	
  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router