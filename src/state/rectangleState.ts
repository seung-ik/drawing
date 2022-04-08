import { useRecoilState, useRecoilValue } from 'recoil';
import { replaceLastUnit } from 'src/utils';
import { paintInfoState } from './paintInfoState';
import { strokeColorState, strokeWidthState } from './toolState';

export const useDrawRectangle = () => {
  const strokeColor = useRecoilValue(strokeColorState);
  const strokeWidth = useRecoilValue(strokeWidthState)[0];
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);
  const lastPaint = paintInfo[paintInfo.length - 1];

  const handleRectMouseDown = (x: number, y: number) => {
    const newRect = { x, y, width: 0, height: 0, key: 0, type: 'tempRectangle' };
    setPaintInfo((prev) => prev.concat(newRect));
  };

  const handleRectMouseMove = (_x: number, _y: number) => {
    if (lastPaint.type === 'tempRectangle') {
      const startX = lastPaint.x as number;
      const startY = lastPaint.y as number;
      const tempRect = {
        ...lastPaint,
        x: startX,
        y: startY,
        width: _x - startX,
        height: _y - startY,
        strokeColor,
        strokeWidth,
      };
      setPaintInfo((prev) => replaceLastUnit(prev, tempRect))
    }
  };

  const handleRectMouseUp = (_x: number, _y: number) => {
    if (lastPaint.type === 'tempRectangle') {
      const startX = lastPaint.x as number;
      const startY = lastPaint.y as number;
      const completedRect = {
        key: paintInfo.length + 1,
        x: startX,
        y: startY,
        width: _x - startX,
        height: _y - startY,
        strokeColor,
        strokeWidth,
        type:'rectangle'
      };
      setPaintInfo((prev) => replaceLastUnit(prev, completedRect))
    }
  };

  return { handleRectMouseDown, handleRectMouseMove, handleRectMouseUp };
};
