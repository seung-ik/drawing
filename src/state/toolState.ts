import { atom } from "recoil";

export type DrawingType = 'pencil' | 'line' | 'curve' | 'polygon' | 'rectangle' | 'circle';

export const drawingTypeState = atom<DrawingType>({
  key: 'toolState/drawingType',
  default: 'pencil',
})

export const strokeColorState = atom<string>({
  key: 'toolState/strokeColor',
  default: 'black',
});