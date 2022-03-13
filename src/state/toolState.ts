import { atom } from 'recoil';

export type DrawingType = 'pencil' | 'line' | 'curve' | 'polygon' | 'rectangle' | 'circle';

type DrawingTypeObj = {
  [key in DrawingType]: string;
};

export const DRAWING_TYPE: DrawingTypeObj = {
  pencil: '연필',
  line: '직선',
  curve: '곡선',
  polygon: '다각형',
  rectangle: '사각형',
  circle: '원',
} as const;

export const drawingTypeState = atom<DrawingType>({
  key: 'toolState/drawingType',
  default: 'pencil',
});

export const strokeColorState = atom<string>({
  key: 'toolState/strokeColor',
  default: 'black',
});

export const strokeWidthState = atom<number[]>({
  key: 'toolState/strokeWidth',
  default: [5],
});
