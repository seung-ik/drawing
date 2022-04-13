import { atom } from "recoil";

export const tickerState = atom<any>({
  key: 'tradeState/ticker',
  default: [],
});