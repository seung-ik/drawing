import Konva from 'konva';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { calcDistanceTwoDots } from 'src/utils';
import { paintInfoState } from './paintInfoState';
import { strokeColorState, strokeWidthState } from './toolState';

export const newCircleState = atom<Konva.CircleConfig[]>({
  key: 'circleState/newCircle',
  default: [],
});

export const circlesState = selector<Konva.CircleConfig[]>({
  key: 'circleState/circles',
  get: ({ get }) => {
    const prevCircles = get(paintInfoState);
    const newCircle = get(newCircleState);
    return [...prevCircles, ...newCircle];
  },
});

export const useDrawCircle = () => {
  const [newCircle, setNewCircle] = useRecoilState(newCircleState);
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);
  const strokeColor = useRecoilValue(strokeColorState);
  const strokeWidth = useRecoilValue(strokeWidthState)[0];

  const handleCircleMouseDown = (x: number, y: number) => {
    if (newCircle.length === 0) {
      setNewCircle([{ x, y, radius: 0 }]);
    }
  };

  const handleCircleMouseMove = (x: number, y: number) => {
    if (newCircle.length === 1) {
      const startX = newCircle[0].x as number;
      const startY = newCircle[0].y as number;
      setNewCircle([
        {
          x: startX,
          y: startY,
          radius: calcDistanceTwoDots(startX, startY, x, y),
          strokeColor,
          strokeWidth,
          key: 0,
        },
      ]);
    }
  };

  const handleCircleMouseUp = (x: number, y: number) => {
    if (newCircle.length === 1) {
      const startX = newCircle[0].x as number;
      const startY = newCircle[0].y as number;
      const completedCircle = {
        x: startX,
        y: startY,
        radius: calcDistanceTwoDots(startX, startY, x, y),
        key: paintInfo.length + 1,
        strokeColor,
        strokeWidth,
      };
      setPaintInfo((prev) => prev.concat(completedCircle));
      setNewCircle([]);
    }
  };

  return { handleCircleMouseDown, handleCircleMouseMove, handleCircleMouseUp };
};
