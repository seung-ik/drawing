import Konva from 'konva';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { KonvaEventObject } from 'konva/lib/Node';
import { newLineState } from './lineState';
import { paintInfoState, tempPaintInfoState } from './paintInfoState';
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
  const [polygonDots, setPolygonDots] = useRecoilState(polygonDotsState);
  const [polygonLine, setPolygonLine] = useRecoilState(polygonLineState);
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);
  const setTempLine = useSetRecoilState(newLineState);
  const [tempPaintInfo, setTempPaintInfo] = useRecoilState(tempPaintInfoState);

  const handlePolygonMouseOver = (e: KonvaEventObject<MouseEvent>) => {
    e.target.scale({ x: 2.5, y: 2.5 });
    setIsStartPointHover(true);
  };

  const handlePolygonMouseOut = (e: KonvaEventObject<MouseEvent>) => {
    e.target.scale({ x: 1, y: 1 });
    setIsStartPointHover(false);
  };

  const handlePolygonMouseDown = (x: number, y: number) => {
    if (isStartPointHover && tempPaintInfo.length > 2) {
      const completedPolygon = {
        ...polygonLine,
        closed: true,
        key: paintInfo.length + 1,
        type: 'line',
      };
      setPaintInfo((prev) => prev.concat(completedPolygon));
      setIsStartPointHover(false);
      setPolygonDots([]);
      setPolygonLine({});
      setTempLine([]);
      setTempPaintInfo([]);
    } else if (tempPaintInfo.length === 0) {
      setPolygonLine({ points: [x, y], strokeColor, strokeWidth, closed: false, key: 0 });
      // setPolygonDots([{ x, y }]);
      setTempPaintInfo([{ x, y, type: 'tempRectDot' }]);
    } else if (tempPaintInfo.length > 0) {
      // setPolygonDots((prev) => prev.concat([{ x, y }]));
      setTempPaintInfo((prev) => prev.concat([{ x, y, type:'tempRectDot' }]));
      setPolygonLine((prev) => {
        const newPoints = prev.points?.concat([x, y]);
        const completedLine = { ...prev, points: newPoints };
        return completedLine;
      });
    }
  };

  const handlePolygonMouseMove = (x: number, y: number) => {
    if (polygonDots.length > 0) {
      const lastPoint = polygonLine.points?.slice(polygonLine.length - 2);
      setTempLine([{ points: lastPoint?.concat([x, y]), strokeColor, strokeWidth, closed: false, key: 0 }]);
    }
  };

  return { handlePolygonMouseDown, handlePolygonMouseOut, handlePolygonMouseOver, handlePolygonMouseMove };
}
