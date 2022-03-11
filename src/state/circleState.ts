import Konva from 'konva';
import { atom, selector, useRecoilState } from 'recoil';
import { calcDistanceTwoDots } from 'src/asset';
import { paintInfoState } from './paintInfoState';

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

  const handleCircleMouseDown = (x: number, y: number) => {
    if (newCircle.length === 0) {
      setNewCircle([{ x, y, radius: 0, key: '0' }]);
    }
  };

  const handleCircleMouseMove = (x: number, y: number, strokeColor: string) => {
    if (newCircle.length === 1) {
      const startX = newCircle[0].x as number;
      const startY = newCircle[0].y as number;
      setNewCircle([
        {
          x: startX,
          y: startY,
          radius: calcDistanceTwoDots(startX, startY, x, y),
          key: '0',
          strokeColor,
        },
      ]);
    }
  };

  const handleCircleMouseUp = (x: number, y: number, strokeColor: string) => {
    if (newCircle.length === 1) {
      const startX = newCircle[0].x as number;
      const startY = newCircle[0].y as number;
      const completedCircle = {
        x: startX,
        y: startY,
        radius: calcDistanceTwoDots(startX, startY, x, y),
        key: paintInfo.length + 1,
        strokeColor,
      };
      setPaintInfo((prev: any) => prev.concat(completedCircle));
      setNewCircle([]);
    }
  };

  return { handleCircleMouseDown, handleCircleMouseMove, handleCircleMouseUp };
};
