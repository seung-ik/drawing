import axios from "axios"

// 요청 당시 빗썸 거래소 가상자산 현재가 정보를 제공합니다.
export const fetchTicker = (symbol="ALL", payment="KRW") => {
  return axios.get(`https://api.bithumb.com/public/ticker/${symbol}_${payment}`).then((response) => response.data);
};

// 거래소 호가 정보를 제공합니다. TODO: cors
export const fetchOrderbook = (symbol="BTC", payment="KRW") => {
  return axios.get(`https://api.bithumb.com/public/orderbook/${symbol}_${payment}`).then((response) => response.data);
}

// 빗썸 거래소 가상자산 거래 체결 완료 내역을 제공합니다.
export const fetchTransactionHistory = (symbol="BTC", payment="KRW") => {
  return axios.get(`https://api.bithumb.com/public/transaction_history/${symbol}_${payment}`).then((response) => response.data);
}

// 가상 자산의 입/출금 현황 정보를 제공합니다.
export const fetchAssetStatus = (symbol="ALL") => {
  return axios.get(`https://api.bithumb.com/public/assetsstatus/${symbol}`).then((response) => response.data);
}