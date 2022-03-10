import React from 'react'
import { default as ColorPicker } from 'react-color/lib/components/circle/Circle';
import { useSetRecoilState } from 'recoil';
import { COLOR_PICKER_LIST } from 'src/asset';
import { DrawingType, drawingTypeState, strokeColorState } from 'src/state/toolState';
import { Buttons } from '../Paint.style';

interface Props {
  strokeColor: string;
  drawingType: DrawingType;
}

const Tool: React.FC<Props> = ({ strokeColor, drawingType }) => {
  const setDrawingType = useSetRecoilState(drawingTypeState);
  const setStrokeColor = useSetRecoilState(strokeColorState);

  const handleDrawingType = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.target as HTMLButtonElement;
    setDrawingType(element.value as DrawingType);
  };

  const handleStrokeColor = (e: any) => {
    setStrokeColor(e.hex);
  };

  return (
    <>
      <ColorPicker colors={COLOR_PICKER_LIST} color={strokeColor} onChangeComplete={handleStrokeColor} />
      <Buttons onClick={handleDrawingType} color={strokeColor}>
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
    </>
  );
};

export default Tool