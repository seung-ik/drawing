import Konva from 'konva';
import { atom, selector, useRecoilState } from 'recoil';
import { paintInfoState } from './paintInfoState';

export const newRectState = atom<Konva.RectConfig[]>({
  key: 'rectangleState/newRect',
  default: [],
});

export const rectanglesState = selector<Konva.RectConfig[]>({
  key: 'rectangleState/rectanglesState',
  get: ({ get }) => {
    const prevRects = get(paintInfoState); // 필터링 해주는게 좋은가? 흠 ? ㅁ ? ? ? ? / ? ? ? ? ??
    const newRect = get(newRectState);
    return [...prevRects, ...newRect];
  },
});

export const useDrawRectangle = () => {
  const [newRect, setNewRect] = useRecoilState(newRectState);
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);

  const handleRectMouseDown = (x: number, y: number) => {
    if (newRect.length === 0) {
      setNewRect([{ x, y, width: 0, height: 0, key: '0' }]);
    }
  };

  const handleRectMouseMove = (x: number, y: number, strokeColor: string) => {
    if (newRect.length === 1) {
      const startX = newRect[0].x as number;
      const startY = newRect[0].y as number;
      setNewRect([
        {
          x: startX,
          y: startY,
          width: x - startX,
          height: y - startY,
          key: '0',
          strokeColor,
        },
      ]);
    }
  };

  const handleRectMouseUp = (x: number, y: number, strokeColor: string) => {
    if (newRect.length === 1) {
      const startX = newRect[0].x as number;
      const startY = newRect[0].y as number;
      const completedRect = {
        x: startX,
        y: startY,
        width: x - startX,
        height: y - startY,
        key: paintInfo.length + 1,
        strokeColor,
      };
      setPaintInfo((prev) => prev.concat(completedRect));
      setNewRect([]);
    }
  };

  return { handleRectMouseDown, handleRectMouseMove, handleRectMouseUp };
};
