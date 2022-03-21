import Konva from 'konva';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { paintInfoState } from './paintInfoState';
import { strokeColorState, strokeWidthState } from './toolState';

export const newLineState = atom<Konva.LineConfig[]>({
  key: 'lineState/newLine',
  default: [],
});

export const linesState = selector<Konva.LineConfig[]>({
  key: 'lineState/lines',
  get: ({ get }) => {
    const pvevLines = get(paintInfoState);
    const newLine = get(newLineState);
    return [...pvevLines, ...newLine];
  },
});

export const useDrawPencil = () => {
  const strokeColor = useRecoilValue(strokeColorState);
  const strokeWidth = useRecoilValue(strokeWidthState)[0];
  const [newLine, setNewLine] = useRecoilState(newLineState);
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);

  const handlePencilMouseDown = (x: number, y: number) => {
    if (newLine.length === 0) {
      setNewLine([{ key: 0, points: [x, y], strokeColor, strokeWidth, closed: false }]);
    }
  };

  const handlePencilMouseMove = (x: number, y: number) => {
    if (newLine.length === 1) {
      setNewLine((prev) => {
        const newPoints = prev[0].points?.concat([x, y]);
        const addedLine = [{ ...prev[0], points: newPoints }];
        return addedLine;
      });
    }
  };

  const handlePencilMouseUp = (x: number, y: number) => {
    if (newLine.length === 1) {
      const completedLine = [{ ...newLine[0], key: paintInfo.length + 1, type: 'line' }];
      setPaintInfo((prev) => prev.concat(completedLine));
      setNewLine([]);
    }
  };

  return { handlePencilMouseDown, handlePencilMouseMove, handlePencilMouseUp };
};

export const useDrawLine = () => {
  const strokeColor = useRecoilValue(strokeColorState);
  const strokeWidth = useRecoilValue(strokeWidthState)[0];
  const [tempLine, setTempLine] = useRecoilState(newLineState);
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);

  const handleLineMouseDown = (x: number, y: number) => {
    if (tempLine.length === 0) {
      setTempLine([{ points: [x, y], strokeColor, strokeWidth, closed: false }]);
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
