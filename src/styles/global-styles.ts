import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    overflow: scroll;
    height: 100vh;
    border: 1px solid yellow;
  }

  * {
    box-sizing: border-box;
  }

  button {
    padding: 0;
    margin: 0;
  }
`;
