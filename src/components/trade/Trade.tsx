import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import isEqual from 'lodash.isequal';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { fetchAssetStatus, fetchOrderbook, fetchTicker, fetchTransactionHistory } from 'src/api';
import { tickerState } from 'src/state/tradeState/tickerState';
import styled from 'styled-components';
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup } from '@chakra-ui/react';

const Wrapper = styled('div')`
  border: 1px solid yellow;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem 0;
`;

const Trade = () => {
  const [ticker, setTicker] = useRecoilState(tickerState);
  //TODO: useQueiries 로 묶어보기 , 동기적으로 처리해보기
  const { isLoading: is1Loading, data: tickerData } = useQuery<any, Error>(['ticker'], (ctx) => {
    console.log(ctx);
    fetchTicker();
  });
  // const { isLoading: is2Loading, data: orderBookData } = useQuery<any, Error>(['orderbook'], () => fetchOrderbook());
  // const { isLoading: is3Loading, data: transactionData } = useQuery<any, Error>(['transaction'], () =>
  //   fetchTransactionHistory(),
  // );
  // const { isLoading: is4Loading, data: assetData } = useQuery<any, Error>(['asset'], () => fetchAssetStatus());

  // console.log('test');
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
  console.log(isEqual(objectA, objectB));

  // console.log(is1Loading, tickerData.data, 1);
  const normalizeTickerData = (originals: any) => {
    const array = [];
    for (const element in originals) {
      array.push(element);
    }
    return { AllSymbol: array, bySymbol: originals };
  };

  // useEffect(() => {
  //   console.log('durl');
  //   if (tickerData) {
  //     setTicker(normalizeTickerData(tickerData.data));
  //   }
  //   console.log(tickerData);
  // }, []);

  // console.log(is2Loading, orderBookData, 2);
  // console.log(is3Loading, transactionData,3);
  // console.log(is4Loading, assetData, 4);

  return (
    <Wrapper>
      <span>트레이드asfd</span>
      <PhoneIcon />
      <AddIcon />
      <ButtonGroup>
        <Button leftIcon={<AddIcon />} colorScheme="teal" variant="solid">
          asdkljfals
        </Button>
      </ButtonGroup>
      <Link to="/">
        <button>페인트</button>
      </Link>
    </Wrapper>
  );
};

export default Trade;
