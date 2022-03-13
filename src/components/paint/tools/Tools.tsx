import React from 'react'
import { ColorResult } from 'react-color';
import { default as ColorPicker } from 'react-color/lib/components/hue/Hue';
import { useRecoilState, useSetRecoilState } from 'recoil';
import RangeSlider from 'src/components/articles/RangeSlider';
import { DrawingType, drawingTypeState, DRAWING_TYPE, strokeColorState, strokeWidthState } from 'src/state/toolState';
import { Buttons, Options } from '../Paint.style';
import RelatedPaintInfoBtn from './RelatedPaintInfoBtn';

interface Props {
  strokeColor: string;
  drawingType: DrawingType;
}

const Tools: React.FC<Props> = ({ strokeColor, drawingType }) => {
  const setDrawingType = useSetRecoilState(drawingTypeState);
  const setStrokeColor = useSetRecoilState(strokeColorState);
  const [strokeWidth, setStrokeWidth] = useRecoilState(strokeWidthState);

  const handleDrawingType = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.target as HTMLButtonElement;
    setDrawingType(element.value as DrawingType);
  };

  const handleStrokeColor = (result: ColorResult) => {
    setStrokeColor(result.hex);
  };
  const handleStrokeWidthSlider = (values: number[]) => {
    setStrokeWidth(values);
  }

  return (
    <>
      <Options>
        <ColorPicker color={strokeColor} onChangeComplete={handleStrokeColor} width="40%" />
        <RangeSlider min={5} max={50} step={1} values={strokeWidth} handleRangeSlider={handleStrokeWidthSlider} />
      </Options>
      <Buttons onClick={handleDrawingType} color={strokeColor}>
        {Object.keys(DRAWING_TYPE).map((value, i) => (
          <button key={i} className={drawingType === value ? 'hilight' : ''} value={value}>
            {DRAWING_TYPE[value as DrawingType]}
          </button>
        ))}
      </Buttons>
      <RelatedPaintInfoBtn />

    </>
  );
};

export default React.memo(Tools);