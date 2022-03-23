import Konva from 'konva';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { KonvaEventObject } from 'konva/lib/Node';
import { tempLineState } from './lineState';
import { paintInfoState, tempDotState } from './paintInfoState';
import { strokeColorState, strokeWidthState } from './toolState';

export const isEndPointHoverState = atom<boolean>({
  key: 'curveLineState/isEndPointHover',
  default: false,
});

export function useDrawCurveLine() {
  const strokeColor = useRecoilValue(strokeColorState);
  const strokeWidth = useRecoilValue(strokeWidthState)[0];
  const [isEndPointHover, setIsEndPointHover] = useRecoilState(isEndPointHoverState);
  // const [curveLineDots, setCurveLineDots] = useRecoilState(curveLineDotsState);
  // const [curveLine, setCurveLine] = useRecoilState(curveLineState);
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);
  const setTempLine = useSetRecoilState(tempLineState);
  const [tempDot, setTempDot] = useRecoilState(tempDotState);

  const handleCurveLineMouseDown = (x: number, y: number) => {
    if (isEndPointHover && tempDot.length > 2) {
      const completedCurveLine = {
        ...paintInfo[paintInfo.length - 1],
        key: paintInfo.length + 1,
        type: 'line',
      };
      setPaintInfo((prev) => prev.concat(completedCurveLine));
      setIsEndPointHover(false);
      setTempLine([]);
      setTempDot([]); 
    } else if (tempDot.length === 0) {
      setTempDot([{ x, y, type: 'tempCircleDot' }]);
      setPaintInfo((prev) =>
        prev.concat({
          points: [x, y],
          strokeColor,
          strokeWidth,
          tension: 0.5,
          bezier: false,
          key: prev.length + 1,
          type: 'unCompletedCurve',
        }),
      );
    } else if (tempDot.length > 0) {
      setTempDot((prev) => prev.concat([{ x, y, type:'tempCircleDot' }]));
      setPaintInfo((prev) => {
        const unCompletedDraw = { ...prev[prev.length - 1] };
        unCompletedDraw.points = unCompletedDraw.points.concat([x, y]); 
        const newUnCompletedDraw = prev.slice(0,prev.length - 1).concat(unCompletedDraw);
        return newUnCompletedDraw;
      });
    }
  };

  const handleCurveLineMouseMove = (x: number, y: number) => {
    if (tempDot.length > 0) {
      console.log(tempDot.length,"length");
      const lastPaint = paintInfo[paintInfo.length - 1];
      const lastPoint = lastPaint.points;
      setTempLine([
        { points: lastPoint.concat([x, y]), strokeColor, strokeWidth, tension: 0.5, bezier: true, key: 0 },
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
