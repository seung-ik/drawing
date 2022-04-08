import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Wrapper = styled('div')`
  border: 1px solid yellow;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem 0;
`;

const Trade = () => {
  return (
    <Wrapper>
      <span>트레이드</span>
      <Link to="/">
        <button>페인트</button>
      </Link>
    </Wrapper>
  )
}

export default Trade