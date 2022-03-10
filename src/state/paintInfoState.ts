import { atom } from "recoil";

export const paintInfoState = atom<any>({
  key: 'paintInfoState/paintInfo',
  default: [],
});