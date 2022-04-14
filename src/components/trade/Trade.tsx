import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom'
import isEqual from 'lodash.isequal';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { fetchAssetStatus, fetchOrderbook, fetchTicker, fetchTransactionHistory } from 'src/api';
import { tickerState } from 'src/state/tradeState/tickerState';
import styled from 'styled-components';

const Wrapper = styled('div')`
  border: 1px solid yellow;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem 0;
`;

const Trade = () => {
  const [ticker, setTicker] = useRecoilState(tickerState);
  const { isLoading: is1Loading, data: tickerData } = useQuery<any, Error>('ticker', () => fetchTicker());
  // const { isLoading: is2Loading, data: orderBookData } = useQuery<any, Error>(['orderbook'], () => fetchOrderbook());
  // const { isLoading: is3Loading, data: transactionData } = useQuery<any, Error>(['transaction'], () => fetchTransactionHistory());
  // const { isLoading: is4Loading, data: assetData } = useQuery<any, Error>(['asset'], () => fetchAssetStatus());

<<<<<<< HEAD
  const normalizeTickerData = (originals: any) => {
=======
  console.log('test');
  const objectA = {
    a: {
      1: 'SAME WILL BE MISSING IN RESULT',
      2: 'BBB',
      3: [1, 2, 3],
    },
    b: 'not',
    c: 'foo bar',
  };
  const objectB = {
    a: {
      1: 'SAME WILL BE MISSING IN RESULT',
      2: 'BBB',
      3: [1, 2, 3],
    },
    b: 'not',
    c: 'foo bar',
  };
  console.log(isEqual(objectA,objectB));

  console.log(is1Loading, tickerData.data, 1);
  const parseTickerData = (originals: any) => {
>>>>>>> 2c22e50 (Add todo (usequery))
    const array = [];
    for (const element in originals) {
      array.push(element);
    }
    return { AllSymbol: array, bySymbol: originals };
  };

  useEffect(() => {
    console.log("durl")
    if (tickerData) {
      setTicker(normalizeTickerData(tickerData.data))
    }
    console.log(tickerData);

  }, []);

  // console.log(is2Loading, orderBookData, 2);
  // console.log(is3Loading, transactionData,3);
  // console.log(is4Loading, assetData, 4);

  return (
    <Wrapper>
      <span>트레이드</span>
      <Link to="/">
        <button>페인트</button>
      </Link>
<<<<<<< HEAD
      {console.log(ticker)}
      {ticker?.AllSymbol.map((symbol: any) => {
        return (
          <div>{symbol}</div>
        )
      })}

=======
>>>>>>> 2c22e50 (Add todo (usequery))
    </Wrapper>
  );
}

export default Trade