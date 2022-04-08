import axios from "axios"

export const fetchTicker = (symbol="ALL", payment="KRW") => {
  return axios.get(`https://api.bithumb.com/public/ticker/${symbol}_${payment}`).then((response) => response);
};