import Konva from 'konva';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { KonvaEventObject } from 'konva/lib/Node';
import { newLineState } from './lineState';
import { paintInfoState, tempPaintInfoState } from './paintInfoState';
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
  const [tempPaintInfo, setTempPaintInfo] = useRecoilState(tempPaintInfoState);

  const handleCurveLineMouseDown = (x: number, y: number) => {
    if (isEndPointHover && tempPaintInfo.length > 2) {
      const completedCurveLine = {
        ...curveLine,
        key: paintInfo.length + 1,
        type: 'line',
      };
      setPaintInfo((prev) => prev.concat(completedCurveLine));
      setIsEndPointHover(false);
      setCurveLineDots([]);
      setCurveLine({});
      setTempLine([]);
      setTempPaintInfo([]); 
    } else if (tempPaintInfo.length === 0) {
      setCurveLine({ points: [x, y], strokeColor, strokeWidth, tension: 0.5, bezier: true, key: 0 }); // 이거 페인트 인포에 타입 uncomplte 로 해서 넣자
      // setCurveLineDots([{ x, y }]);
      setTempPaintInfo([{ x, y, type: 'tempCircleDot' }]);
      console.log(1)
    } else if (tempPaintInfo.length > 0) {
      console.log(2);
      // setCurveLineDots((prev) => prev.concat([{ x, y }]));
      setTempPaintInfo((prev) => prev.concat([{ x, y, type:'tempCircleDot' }]));
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
