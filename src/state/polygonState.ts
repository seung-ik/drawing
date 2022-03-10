import Konva from "konva";
import { atom, useRecoilState, useSetRecoilState } from "recoil";

export const isStartPointHoverState = atom<boolean>({
  key: 'polygonState/isStartPointHover',
  default: false,
})

export const polygonDotsState = atom<Konva.RectConfig[]>({
  key: 'polygonState/polygonDots',
  default: [],
})

export const polygonLineState = atom<Konva.LineConfig>({
  key: 'polygonState/polygonLineState',
  default: {},
});

export const polygonsState = atom<Konva.LineConfig[]>({
  key: 'polygonState/polygons',
  default: [],
});

export function useDrawPolygon(): any {
  const [isStartPointHover, setIsStartPointHover] = useRecoilState(isStartPointHoverState);
  const [polygonDots, setPolygonDots] = useRecoilState(polygonDotsState);
  const [polygonLine, setPolygonLine] = useRecoilState(polygonLineState);
  const setPolygons = useSetRecoilState(polygonsState);

  const HandlePolygonMouseOver = (e: any) => {
    e.target.scale({ x: 2.5, y: 2.5 });
    setIsStartPointHover(true);
  };

  const HandlePolygonMouseOut = (e: any) => {
    e.target.scale({ x: 1, y: 1 });
    setIsStartPointHover(false);
  };

  const HandlePolygonMouseDown = (x: number, y: number, paintColor: string) => {
    if (isStartPointHover && polygonDots.length > 2) { //3번째 클릭이후 이면서 처음 클릭지점을 클릭할때
      setIsStartPointHover(false);
      setPolygons((prev) => prev.concat(polygonLine as Konva.LineConfig));
      setPolygonDots([]);
      setPolygonLine({});
    } else if (polygonDots.length === 0) { // 다각형타입에서 처음 눌렀을때
      setPolygonLine({ points: [x, y], strokeColor: paintColor });
      setPolygonDots([{ x, y }]);
    } else if (polygonDots.length > 0) { // 2번째 눌렀을때 부터 ..
      setPolygonDots((prev) => prev.concat([{ x, y }]));
      setPolygonLine((prev) => {
        const prevPoint = prev?.points as [number, number];
        const newPoints = prevPoint.concat([x, y]);
        return { ...prev, points: newPoints };
      });
    }
  };

  return { HandlePolygonMouseDown, HandlePolygonMouseOut, HandlePolygonMouseOver };
}