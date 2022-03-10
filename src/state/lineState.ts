import Konva from 'konva';
import { atom, selector, useRecoilState, useSetRecoilState } from 'recoil';
import { paintInfoState } from './paintInfoState';

export const prevLinesState = atom<Konva.LineConfig[]>({
  key: 'prevLines',
  default: [],
});

export const newLineState = atom<Konva.LineConfig[]>({
  key: 'newLine',
  default: [],
});

export const linesState = selector<Konva.LineConfig[]>({
  key: 'lines',
  get: ({ get }) => {
    const savedLines = get(paintInfoState);
    const prevLines = get(prevLinesState);
    const newLine = get(newLineState);

    return [...savedLines, ...prevLines, ...newLine];
  },
});

export const useDrawLine = () => {
  const [prevLines, setPrevLines] = useRecoilState(prevLinesState);
  const [newLine, setNewLine] = useRecoilState(newLineState);
  const setPaintInfo = useSetRecoilState(paintInfoState);

  const handleLineMouseDown = (x: number, y: number, strokeColor: string) => {
    if (newLine.length === 0) {
      setNewLine([{ points: [x, y], strokeColor, closed: false }]);
    }
  };

  const handleLineMouseMove = (x: number, y: number) => {
    if (newLine.length === 1) {
      setNewLine((prev) => {
        const newPoints = prev[0].points?.concat([x, y]);
        const completedLine = { ...prev[0], points: newPoints };
        return [completedLine];
      });
    }
  };

  const handleLineMouseUp = (x: number, y: number) => {
    setPrevLines((prev) => prev.concat(newLine));
    setPaintInfo((prev: any) => prev.concat(newLine));
    setNewLine([]);
  };

  return { handleLineMouseDown, handleLineMouseMove, handleLineMouseUp };
};
