import styled from 'styled-components';

export const Wrapper = styled('div')`
  border: 2px solid purple;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;

  & > .screen {
    border: 2px solid red;
    height: 500px;
  }
`;
