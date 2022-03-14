import Konva from 'konva';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { KonvaEventObject } from 'konva/lib/Node';
import { newLineState } from './lineState';
import { paintInfoState } from './paintInfoState';
import { strokeColorState, strokeWidthState } from './toolState';

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

export function useDrawCurveLine() {
  const strokeColor = useRecoilValue(strokeColorState);
  const strokeWidth = useRecoilValue(strokeWidthState)[0];
  const [isEndPointHover, setIsEndPointHover] = useRecoilState(isEndPointHoverState);
  const [curveLineDots, setCurveLineDots] = useRecoilState(curveLineDotsState);
  const [curveLine, setCurveLine] = useRecoilState(curveLineState);
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);
  const setTempLine = useSetRecoilState(newLineState);

  const handleCurveLineMouseDown = (x: number, y: number) => {
    if (isEndPointHover && curveLineDots.length > 2) {
      const completedCurveLine = {
        ...curveLine,
        key: paintInfo.length + 1,
      };
      setPaintInfo((prev) => prev.concat(completedCurveLine));
      setIsEndPointHover(false);
      setCurveLineDots([]);
      setCurveLine({});
      setTempLine([]);
    } else if (curveLineDots.length === 0) {
      setCurveLine({ points: [x, y], strokeColor, strokeWidth, tension: 0.5, bezier: true, key: 0 });
      setCurveLineDots([{ x, y }]);
    } else if (curveLineDots.length > 0) {
      setCurveLineDots((prev) => prev.concat([{ x, y }]));
      setCurveLine((prev) => {
        const newPoints = prev.points?.concat([x, y]);
        const completedLine = { ...prev, points: newPoints };
        return completedLine;
      });
    }
  };

  const handleCurveLineMouseMove = (x: number, y: number) => {
    if (curveLineDots.length > 0) {
      const lastPoint = curveLine.points;
      setTempLine([
        { points: lastPoint?.concat([x, y]), strokeColor, strokeWidth, tension: 0.5, bezier: true, key: 0 },
      ]);
    }
  };

  const handleCurveLineMouseOver = (e: KonvaEventObject<MouseEvent>) => {
    e.target.scale({ x: 2.5, y: 2.5 });
    setIsEndPointHover(true);
  };

  const handleCurveLineMouseOut = (e: KonvaEventObject<MouseEvent>) => {
    e.target.scale({ x: 1, y: 1 });
    setIsEndPointHover(false);
  };

  return { handleCurveLineMouseDown, handleCurveLineMouseOut, handleCurveLineMouseOver, handleCurveLineMouseMove };
}
