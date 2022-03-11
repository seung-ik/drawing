import React from 'react'
import { ColorResult } from 'react-color';
import { default as ColorPicker } from 'react-color/lib/components/circle/Circle';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { COLOR_PICKER_LIST } from 'src/asset';
import { DrawConfig, paintInfoState, undoListState } from 'src/state/paintInfoState';
import { DrawingType, drawingTypeState, strokeColorState } from 'src/state/toolState';
import { Buttons } from '../Paint.style';

interface Props {
  strokeColor: string;
  drawingType: DrawingType;
}

const Tool: React.FC<Props> = ({ strokeColor, drawingType }) => {
  const setDrawingType = useSetRecoilState(drawingTypeState);
  const setStrokeColor = useSetRecoilState(strokeColorState);
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);
  const [undoList, setUndoList] = useRecoilState(undoListState);
  const isCanUndo = paintInfo.length > 0 && undoList.length < 40;
  const isCanRedo = undoList.length > 0;

  const handleDrawingType = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.target as HTMLButtonElement;
    setDrawingType(element.value as DrawingType);
  };

  const handleStrokeColor = (result: ColorResult) => {
    setStrokeColor(result.hex);
  };

  const handlePaintInfo = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.target as HTMLButtonElement;
    if (element.value === "delete") {
      setPaintInfo([])
    } else if (element.value === 'undo' && isCanUndo) {
      const lastIndex = paintInfo.length - 1
      const lastPaintInfo = paintInfo[lastIndex];
      setUndoList(prev => prev.concat(lastPaintInfo))
      setPaintInfo(prev => prev.slice(0, lastIndex))
    } else if (element.value === 'redo' && isCanRedo) {
      const lastIndex = undoList.length - 1;
      const lastUndoInfo = undoList[lastIndex];
      setPaintInfo(prev => prev.concat(lastUndoInfo));
      setUndoList(prev => prev.slice(0, lastIndex))
    } else {
      alert('안되요')
    }
  }

  return (
    <>
      <ColorPicker colors={COLOR_PICKER_LIST} color={strokeColor} onChangeComplete={handleStrokeColor} />
      <Buttons onClick={handleDrawingType} color={strokeColor}>
        <button className={drawingType === 'pencil' ? 'hilight' : ''} value="pencil">
          연필
        </button>
        <button className={drawingType === 'line' ? 'hilight' : ''} value="line">
          직선
        </button>
        <button className={drawingType === 'curve' ? 'hilight' : ''} value="curve">
          곡선
        </button>
        <button className={drawingType === 'polygon' ? 'hilight' : ''} value="polygon">
          다각형
        </button>
        <button className={drawingType === 'rectangle' ? 'hilight' : ''} value="rectangle">
          사각형
        </button>
        <button className={drawingType === 'circle' ? 'hilight' : ''} value="circle">
          원
        </button>
      </Buttons>
      <Buttons onClick={handlePaintInfo}>
        <button value="delete">삭제</button>
        <button value="undo">뒤로 돌리기</button>
        <button value="redo">앞으로 돌리기</button>
      </Buttons>
    </>
  );
};

export default Tool