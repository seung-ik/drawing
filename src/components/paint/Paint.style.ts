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
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-top: 1rem;

    & > .color-picker {
      height: auto;
      width: 50%;
      margin-bottom: 2rem;
    }
  }
`;

export const Buttons = styled('div')<{ color?: string }>`
  display: flex;
  border: 1px solid yellow;
  & button {
    flex: 1;
    height: 5rem;
    border: 1px solid purple;
  }

  & > .hilight {
    background-color: ${({ color }) => color};
    color: white;
  }
`;

export const Options = styled('div')`
  display: flex;
  border: 1px solid black;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;
