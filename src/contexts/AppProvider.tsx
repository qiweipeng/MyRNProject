import React, {ReactNode} from 'react';
import {AuthProvider} from './AuthContext';
import {CommonProvider} from './CommonContext';

export const AppProvider = ({children}: {children: ReactNode}) => {
  return (
    <CommonProvider>
      <AuthProvider>{children}</AuthProvider>;
    </CommonProvider>
  );
};
