import Konva from 'konva';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { KonvaEventObject } from 'konva/lib/Node';
import { tempLineState } from './lineState';
import { paintInfoState, tempDotState } from './paintInfoState';
import { strokeColorState, strokeWidthState } from './toolState';

export const isStartPointHoverState = atom<boolean>({
  key: 'polygonState/isStartPointHover',
  default: false,
});

export const polygonDotsState = atom<Konva.RectConfig[]>({
  key: 'polygonState/polygonDots',
  default: [],
});

export const polygonLineState = atom<Konva.LineConfig>({
  key: 'polygonState/polygonLineState',
  default: {},
});

export function useDrawPolygon(): any {
  const strokeColor = useRecoilValue(strokeColorState);
  const strokeWidth = useRecoilValue(strokeWidthState)[0];
  const [isStartPointHover, setIsStartPointHover] = useRecoilState(isStartPointHoverState);
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);
  const setTempLine = useSetRecoilState(tempLineState);
  const [tempDot, setTempDot] = useRecoilState(tempDotState);

  const handlePolygonMouseOver = (e: KonvaEventObject<MouseEvent>) => {
    e.target.scale({ x: 2.5, y: 2.5 });
    setIsStartPointHover(true);
  };

  const handlePolygonMouseOut = (e: KonvaEventObject<MouseEvent>) => {
    e.target.scale({ x: 1, y: 1 });
    setIsStartPointHover(false);
  };

  const handlePolygonMouseDown = (x: number, y: number) => {
    if (isStartPointHover && tempDot.length > 2) {
      const completedPolygon = {
        ...paintInfo[paintInfo.length - 1],
        closed: true,
        key: paintInfo.length + 1,
        type: 'line',
      };
      setPaintInfo((prev) => prev.slice(0,prev.length - 1).concat(completedPolygon));
      setIsStartPointHover(false);
      setTempLine([]);
      setTempDot([]);
    } else if (tempDot.length === 0) {
      setTempDot([{ x, y, type: 'tempRectDot' }]);
      setPaintInfo((prev) =>
        prev.concat({
          points: [x, y],
          strokeColor,
          strokeWidth,
          closed: false,
          key: prev.length + 1,
          type: 'unCompletedPolygon',
        }),
      );
    } else if (tempDot.length > 0) {
      setTempDot((prev) => prev.concat([{ x, y, type: 'tempRectDot' }]));
      setPaintInfo((prev) => {
        const unCompletedDraw = { ...prev[prev.length - 1] };
        unCompletedDraw.points = unCompletedDraw.points.concat([x, y]);
        const newUnCompletedDraw = prev.slice(0, prev.length - 1).concat(unCompletedDraw);
        return newUnCompletedDraw;
      });
    }
  };

  const handlePolygonMouseMove = (x: number, y: number) => {
    if (tempDot.length > 0) {
      const lastPaint = paintInfo[paintInfo.length - 1];
      const lastPoint = lastPaint.points.slice(lastPaint.length - 2);
      setTempLine([{ points: lastPoint.concat([x, y]), strokeColor, strokeWidth, closed: false, key: 0 }]);
    }
  };

  return { handlePolygonMouseDown, handlePolygonMouseOut, handlePolygonMouseOver, handlePolygonMouseMove };
}
