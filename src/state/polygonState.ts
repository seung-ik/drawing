import Konva from 'konva';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { newLineState } from './lineState';
import { paintInfoState } from './paintInfoState';

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
  const [isStartPointHover, setIsStartPointHover] = useRecoilState(isStartPointHoverState);
  const [polygonDots, setPolygonDots] = useRecoilState(polygonDotsState);
  const [polygonLine, setPolygonLine] = useRecoilState(polygonLineState);
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);
  const setTempLine = useSetRecoilState(newLineState);

  const handlePolygonMouseOver = (e: any) => {
    e.target.scale({ x: 2.5, y: 2.5 });
    setIsStartPointHover(true);
  };

  const handlePolygonMouseOut = (e: any) => {
    e.target.scale({ x: 1, y: 1 });
    setIsStartPointHover(false);
  };

  const handlePolygonMouseDown = (x: number, y: number, strokeColor: string) => {
    if (isStartPointHover && polygonDots.length > 2) {
      const completedPolygon = {
        ...polygonLine,
        closed: true,
        key: paintInfo.length + 1,
      };
      setPaintInfo((prev) => prev.concat(completedPolygon));
      setIsStartPointHover(false);
      setPolygonDots([]);
      setPolygonLine({});
      setTempLine([]);
    } else if (polygonDots.length === 0) {
      setPolygonLine({ points: [x, y], strokeColor, closed: false, key: '0' });
      setPolygonDots([{ x, y }]);
    } else if (polygonDots.length > 0) {
      setPolygonDots((prev) => prev.concat([{ x, y }]));
      setPolygonLine((prev) => {
        const newPoints = prev.points?.concat([x, y]);
        const completedLine = { ...prev, points: newPoints };
        return completedLine;
      });
    }
  };

  const handlePolygonMouseMove = (x: number, y: number, strokeColor: string) => {
    if (polygonDots.length > 0) {
      const lastPoint = polygonLine.points?.slice(polygonLine.length - 2);
      setTempLine([{ points: lastPoint?.concat([x, y]), strokeColor, closed: false, key: '0' }]);
    }
  };

  return { handlePolygonMouseDown, handlePolygonMouseOut, handlePolygonMouseOver, handlePolygonMouseMove };
}
