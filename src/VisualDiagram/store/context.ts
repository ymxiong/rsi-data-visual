import React, { Context } from 'react';
import { ReactReduxContextValue } from 'react-redux';
import { AnyAction } from 'redux';

export const visualCoreContext = (React.createContext(
  null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as unknown) as Context<ReactReduxContextValue<any, AnyAction>>;
