import { atom } from "recoil";

export type DrawingType = 'line' | 'curve' | 'polygon' | 'rectangle' | 'circle';

export const drawingTypeState = atom<DrawingType>({
  key: 'toolState/drawingType',
  default: 'line',
})

export const strokeColorState = atom<string>({
  key: 'toolState/strokeColor',
  default: 'black',
});