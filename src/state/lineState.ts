import Konva from 'konva';
import { atom, selector, useRecoilState } from 'recoil';
import { paintInfoState } from './paintInfoState';

export const newLineState = atom<Konva.LineConfig[]>({
  key: 'newLine',
  default: [],
});

export const linesState = selector<Konva.LineConfig[]>({
  key: 'lines',
  get: ({ get }) => {
    const pvevLines = get(paintInfoState);
    const newLine = get(newLineState);
    return [...pvevLines, ...newLine];
  },
});

export const useDrawLine = () => {
  const [newLine, setNewLine] = useRecoilState(newLineState);
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);

  const handleLineMouseDown = (x: number, y: number, strokeColor: string) => {
    if (newLine.length === 0) {
      setNewLine([{ points: [x, y], strokeColor, closed: false, key: '0' }]);
    }
  };

  const handleLineMouseMove = (x: number, y: number) => {
    if (newLine.length === 1) {
      setNewLine((prev) => {
        const newPoints = prev[0].points?.concat([x, y]);
        const addedLine = [{ ...prev[0], points: newPoints }];
        return addedLine;
      });
    }
  };

  const handleLineMouseUp = (x: number, y: number) => {
    if (newLine.length === 1) {
      const completedLine = [{ ...newLine[0], key: paintInfo.length + 1 }];
      setPaintInfo((prev: any) => prev.concat(completedLine));
      setNewLine([]);
    }
  };

  return { handleLineMouseDown, handleLineMouseMove, handleLineMouseUp };
};
