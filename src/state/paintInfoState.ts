import Konva from 'konva';
import { atom } from 'recoil';

export type DrawConfig = Konva.RectConfig | Konva.CircleConfig | Konva.LineConfig;

export const paintInfoState = atom<DrawConfig[]>({
  key: 'paintInfoState/paintInfo',
  default: [],
});

export const undoListState = atom<DrawConfig[]>({
  key: 'paintInfoState/undoList',
  default: [],
});
