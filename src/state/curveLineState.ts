import Konva from 'konva';
import { atom, useRecoilState } from 'recoil';
import { paintInfoState } from './paintInfoState';

export const isEndPointHoverState = atom<boolean>({
  key: 'curveLineState/isEndPointHover',
  default: false,
});

export const curveLineDotsState = atom<Konva.CircleConfig[]>({
  key: 'curveLineState/curveLinesDots',
  default: [],
});

export const curveLineState = atom<Konva.LineConfig>({
  key: 'curveLineState/curveLineState',
  default: {},
});

export function useDrawCurveLine(): any {
  const [isEndPointHover, setIsEndPointHover] = useRecoilState(isEndPointHoverState);
  const [curveLineDots, setCurveLineDots] = useRecoilState(curveLineDotsState);
  const [curveLine, setCurveLine] = useRecoilState(curveLineState);
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);

  const handleCurveLineMouseOver = (e: any) => {
    e.target.scale({ x: 2.5, y: 2.5 });
    setIsEndPointHover(true);
  };

  const handleCurveLineMouseOut = (e: any) => {
    e.target.scale({ x: 1, y: 1 });
    setIsEndPointHover(false);
  };

  const handleCurveLineMouseDown = (x: number, y: number, strokeColor: string) => {
    if (isEndPointHover && curveLineDots.length > 2) {
      const completedCurveLine = {
        ...curveLine,
        key: paintInfo.length + 1,
      };
      setPaintInfo((prev: any) => {
        return prev.concat(completedCurveLine);
      });
      setIsEndPointHover(false);
      setCurveLineDots([]);
      setCurveLine({});
    } else if (curveLineDots.length === 0) {
      setCurveLine({ points: [x, y], strokeColor, tension: 0.5, bezier: true, key: '0' });
      setCurveLineDots([{ x, y }]);
    } else if (curveLineDots.length > 0) {
      setCurveLineDots((prev) => prev.concat([{ x, y }]));
      setCurveLine((prev) => {
        const newPoints = prev.points?.concat([x, y]);
        const completedLine = { ...prev, points: newPoints};
        return completedLine;
      });
    }
  };

  return { handleCurveLineMouseDown, handleCurveLineMouseOut, handleCurveLineMouseOver };
}
