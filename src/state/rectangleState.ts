import Konva from 'konva';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { paintInfoState } from './paintInfoState';
import { strokeColorState, strokeWidthState } from './toolState';

export const newRectState = atom<Konva.RectConfig[]>({
  key: 'rectangleState/newRect',
  default: [],
});

export const rectanglesState = selector<Konva.RectConfig[]>({
  key: 'rectangleState/rectanglesState',
  get: ({ get }) => {
    const prevRects = get(paintInfoState);
    const newRect = get(newRectState);
    return [...prevRects, ...newRect];
  },
});

export const useDrawRectangle = () => {
  const strokeColor = useRecoilValue(strokeColorState);
  const strokeWidth = useRecoilValue(strokeWidthState)[0];
  const [newRect, setNewRect] = useRecoilState(newRectState);
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);

  const handleRectMouseDown = (x: number, y: number) => {
    if (newRect.length === 0) {
      setNewRect([{ x, y, width: 0, height: 0, key: 0 }]);
    }
  };

  const handleRectMouseMove = (x: number, y: number) => {
    if (newRect.length === 1) {
      const startX = newRect[0].x as number;
      const startY = newRect[0].y as number;
      setNewRect([
        {
          key: 0,
          x: startX,
          y: startY,
          width: x - startX,
          height: y - startY,
          strokeColor,
          strokeWidth,
        },
      ]);
    }
  };

  const handleRectMouseUp = (x: number, y: number) => {
    if (newRect.length === 1) {
      const startX = newRect[0].x as number;
      const startY = newRect[0].y as number;
      const completedRect = {
        key: paintInfo.length + 1,
        x: startX,
        y: startY,
        width: x - startX,
        height: y - startY,
        strokeColor,
        strokeWidth,
        type:'rectangle'
      };
      setPaintInfo((prev) => prev.concat(completedRect));
      setNewRect([]);
    }
  };

  return { handleRectMouseDown, handleRectMouseMove, handleRectMouseUp };
};
