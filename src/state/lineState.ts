import Konva from 'konva';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { paintInfoState } from './paintInfoState';
import { strokeColorState, strokeWidthState } from './toolState';

export const tempLineState = atom<Konva.LineConfig[]>({
  key: 'lineState/tempLine',
  default: [],
});

export const useDrawPencil = () => {
  const strokeColor = useRecoilValue(strokeColorState);
  const strokeWidth = useRecoilValue(strokeWidthState)[0];
  const [tempLine, setTempLine] = useRecoilState(tempLineState);
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);

  const handlePencilMouseDown = (x: number, y: number) => {
    if (tempLine.length === 0) {
      setTempLine([{ key: 0, points: [x, y], strokeColor, strokeWidth, closed: false }]);
    }
  };

  const handlePencilMouseMove = (x: number, y: number) => {
    if (tempLine.length === 1) {
      setTempLine((prev) => {
        const newPoints = prev[0].points?.concat([x, y]);
        const addedLine = [{ ...prev[0], points: newPoints }];
        return addedLine;
      });
    }
  };

  const handlePencilMouseUp = (x: number, y: number) => {
    if (tempLine.length === 1) {
      const completedLine = [{ ...tempLine[0], key: paintInfo.length + 1, type: 'line' }];
      setPaintInfo((prev) => prev.concat(completedLine));
      setTempLine([]);
    }
  };

  return { handlePencilMouseDown, handlePencilMouseMove, handlePencilMouseUp };
};

export const useDrawLine = () => {
  const strokeColor = useRecoilValue(strokeColorState);
  const strokeWidth = useRecoilValue(strokeWidthState)[0];
  const [tempLine, setTempLine] = useRecoilState(tempLineState);
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);

  const handleLineMouseDown = (x: number, y: number) => {
    if (tempLine.length === 0) {
      setTempLine([{ points: [x, y], strokeColor, strokeWidth, closed: false }]); // TODO : 객체만 넣는걸로 바꾸자 아마 도 여러개 들어갈일없을듯? 확인한번 하고
    } else if (tempLine.length === 1) {
      const firstPoint = tempLine[0].points?.slice(0, 2) as number[];
      const completedLine = [
        { points: firstPoint.concat([x, y]), strokeColor, strokeWidth, closed: false, key: paintInfo.length + 1 },
      ];
      setPaintInfo((prev) => prev.concat(completedLine));
      setTempLine([]);
    }
  };

  const handleLineMouseMove = (x: number, y: number) => {
    if (tempLine.length === 1) {
      setTempLine((prev) => {
        const firstPoint = prev[0].points?.slice(0, 2) as number[];
        const unCompletedLine = [{ ...prev[0], points: firstPoint.concat([x, y]) }];
        return unCompletedLine;
      });
    }
  };

  return { handleLineMouseDown, handleLineMouseMove };
};
