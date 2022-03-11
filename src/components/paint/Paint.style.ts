import styled from 'styled-components';

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  border: 1px solid red;
  padding: 1rem 0;

  & > .screen {
    border: 2px solid purple;
  }

  & > .tools {
    display: flex;
    flex-direction: column;
    width: 90%;
    border: 2px solid green;
    margin-top: 1rem;
  }
`;

export const Buttons = styled('div')<{ color?: string }>`
  display: flex;
  flex: 1;
  border: 1px solid yellow;
  

  &  button {
    flex: 1;
    height: 5rem;
  }

  & > .hilight {
    background-color: ${({ color }) => color};
    color: white;
  }
`;