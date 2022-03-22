import Konva from 'konva';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { calcDistanceTwoDots, replaceLastUnit } from 'src/utils';
import { paintInfoState, tempDotState } from './paintInfoState';
import { strokeColorState, strokeWidthState } from './toolState';

export const newCircleState = atom<Konva.CircleConfig[]>({
  key: 'circleState/newCircle',
  default: [],
});

export const circlesState = selector<Konva.CircleConfig[]>({
  key: 'circleState/circles',
  get: ({ get }) => {
    // const prevCircles = get(paintInfoState);
    const newCircle = get(newCircleState);
    // return [...prevCircles, ...newCircle];
    return [...newCircle];
  },
});

export const useDrawCircle = () => {
  const strokeColor = useRecoilValue(strokeColorState);
  const strokeWidth = useRecoilValue(strokeWidthState)[0];
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);
  const lastPaint = paintInfo[paintInfo.length - 1];

  const handleCircleMouseDown = (x: number, y: number) => {
    const newCircle = { x, y, radius: 0, type: 'tempCircle', key: 0 };
    setPaintInfo((prev) => prev.concat(newCircle));
  };
// move 에도 디바운싱 해주면 좋을듯?
  const handleCircleMouseMove = (_x: number, _y: number) => {
    if (lastPaint.type === 'tempCircle') {
      const startX = lastPaint.x as number;
      const startY = lastPaint.y as number;
      const tempCircle = {
        ...lastPaint,
        x: startX,
        y: startY,
        radius: calcDistanceTwoDots(startX, startY, _x, _y),
        strokeColor,
        strokeWidth,
      };
      setPaintInfo((prev) => replaceLastUnit(prev, tempCircle))
    }
  };

  const handleCircleMouseUp = (_x: number, _y: number) => {
    if (lastPaint.type === 'tempCircle') {
      const startX = lastPaint.x as number;
      const startY = lastPaint.y as number;
      const completedCircle = {
        key: paintInfo.length + 1,
        x: startX,
        y: startY,
        radius: calcDistanceTwoDots(startX, startY, _x, _y),
        strokeColor,
        strokeWidth,
        type:'circle',
      };
      setPaintInfo((prev) => replaceLastUnit(prev, completedCircle))
    }
  };

  return { handleCircleMouseDown, handleCircleMouseMove, handleCircleMouseUp };
};
