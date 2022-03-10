import Konva from "konva";
import { atom, selector, useRecoilState, useSetRecoilState } from "recoil";
import { paintInfoState } from "./paintInfoState";

export const prevRectsState = atom<Konva.RectConfig[]>({
  key: 'rectangleState/prevRects',
  default: [],
});

export const newRectState = atom<Konva.RectConfig[]>({
  key: 'rectangleState/newRect',
  default: [],
});

export const rectanglesState = selector<Konva.RectConfig[]>({
  key: 'rectangleState/rectanglesState',
  get: ({ get }) => {
    const savedRects = get(paintInfoState)
    const prevRects = get(prevRectsState);
    const newRect = get(newRectState);

    return [...savedRects,...prevRects, ...newRect]; 
  },
});

export const useDrawRectangle = () => {
  const [newRect, setNewRect] = useRecoilState(newRectState);
  const [prevRects, setPrevRects] = useRecoilState(prevRectsState);
  const setPaintInfo = useSetRecoilState(paintInfoState)

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
        key: prevRects.length + 1,
        strokeColor,
      };
      setNewRect([]);
      setPrevRects((prev) => prev.concat(completedRect));
      setPaintInfo((prev: any) => prev.concat(completedRect));
    }
  };

  return { handleRectMouseDown, handleRectMouseMove, handleRectMouseUp };
}