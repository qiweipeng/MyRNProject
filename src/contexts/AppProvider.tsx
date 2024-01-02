import React, {ReactNode} from 'react';
import {CommonProvider} from './CommonContext';
import {AuthProvider} from './AuthContext';

export const AppProvider = ({children}: {children: ReactNode}) => {
  return (
    <CommonProvider>
      <AuthProvider>{children}</AuthProvider>
    </CommonProvider>
  );
};
