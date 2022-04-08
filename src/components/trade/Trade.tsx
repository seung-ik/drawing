import React from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom'
import { fetchTicker } from 'src/api';
import styled from 'styled-components';

const Wrapper = styled('div')`
  border: 1px solid yellow;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem 0;
`;

const Trade = () => {
  const { isLoading, data } = useQuery<unknown, any>(['ticker'], () => fetchTicker());

  console.log(isLoading, data);

  return (
    <Wrapper>
      <span>트레이드</span>
      <Link to="/">
        <button>페인트</button>
      </Link>
    </Wrapper>
  );
}

export default Trade