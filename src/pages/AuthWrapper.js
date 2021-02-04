// A wrapper component to get the isLoading to  false & (isAuthenticated && user && true) to get the user to redirect at Dashboard from  Login page.

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import loadingGif from '../assets/img/preloader.gif';
import styled from 'styled-components';

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`;

function AuthWrapper({ children }) {
  const { isLoading, error } = useAuth0();
  if (isLoading) {
    return (
      <Wrapper>
        <img src={loadingGif} alt='spinner' />
      </Wrapper>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  }
  return <>{children}</>;
  // the children component is the `Dashboard` within the Router.
};

export default AuthWrapper;
