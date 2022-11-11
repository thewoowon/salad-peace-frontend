import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { isLoggedInVar } from '../apollo';
import { LoggedInRouter } from '../router/logged-in-router';
import { LoggedOutRouter } from '../router/logged-out-router';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
      isLoggedIn ? 
      <LoggedInRouter></LoggedInRouter>
      :
      <LoggedOutRouter></LoggedOutRouter>
  );
}
