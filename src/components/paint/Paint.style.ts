import styled from 'styled-components';

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 1rem 0;

  & > .screen {
    border: 2px solid black;
  }

  & > .tools {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

  & button {
    flex: 1;
    height: 5rem;
    border: 1px solid black;
    cursor: pointer;
  }

  & > .hilight {
    border: ${({ color }) => `0.5rem solid ${color}`};
    color: ${({ color }) => color};
    font-weight: bold;
  }

  & > button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const Options = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;
