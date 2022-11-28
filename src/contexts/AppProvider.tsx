import React, {ReactNode} from 'react';
import {AuthProvider} from './AuthContext';

export const AppProvider = ({children}: {children: ReactNode}): JSX.Element => {
  return <AuthProvider>{children}</AuthProvider>;
};
