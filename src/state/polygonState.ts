import Konva from 'konva';
import { atom, useRecoilState } from 'recoil';
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

  const handlePolygonMouseOver = (e: any) => {
    e.target.scale({ x: 2.5, y: 2.5 });
    setIsStartPointHover(true);
  };

  const handlePolygonMouseOut = (e: any) => {
    e.target.scale({ x: 1, y: 1 });
    setIsStartPointHover(false);
  };

  const handlePolygonMouseDown = (x: number, y: number, paintColor: string) => {
    if (isStartPointHover && polygonDots.length > 2) {
      const completedPolygon = {
        ...polygonLine,
        closed: true,
        key: paintInfo.length + 1,
      };
      setPaintInfo((prev: any) => {
        return prev.concat(completedPolygon);
      });
      setIsStartPointHover(false);
      setPolygonDots([]);
      setPolygonLine({});
    } else if (polygonDots.length === 0) {
      setPolygonLine({ points: [x, y], strokeColor: paintColor, closed: false, key: '0' });
      setPolygonDots([{ x, y }]);
    } else if (polygonDots.length > 0) {
      setPolygonDots((prev) => prev.concat([{ x, y }]));
      setPolygonLine((prev) => {
        const newPoints = prev.points?.concat([x, y]);
        const completedLine = { ...prev, points: newPoints};
        return completedLine;
      });
    }
  };

  return { handlePolygonMouseDown, handlePolygonMouseOut, handlePolygonMouseOver };
}
