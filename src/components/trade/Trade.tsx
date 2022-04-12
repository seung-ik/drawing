import React from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom'
import { fetchAssetStatus, fetchOrderbook, fetchTicker, fetchTransactionHistory } from 'src/api';
import styled from 'styled-components';

const Wrapper = styled('div')`
  border: 1px solid yellow;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem 0;
`;

const Trade = () => {
  const { isLoading: is1Loading, data: tickerData } = useQuery<any, Error>(['ticker'], () => fetchTicker());
  const { isLoading: is2Loading, data: orderBookData } = useQuery<any, Error>(['orderbook'], () => fetchOrderbook());
  const { isLoading: is3Loading, data: transactionData } = useQuery<any, Error>(['transaction'], () => fetchTransactionHistory());
  const { isLoading: is4Loading, data: assetData } = useQuery<any, Error>(['asset'], () => fetchAssetStatus());

  console.log(is1Loading, tickerData, 1);
  console.log(is2Loading, orderBookData, 2);
  console.log(is3Loading, transactionData,3);
  console.log(is4Loading, assetData, 4);

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