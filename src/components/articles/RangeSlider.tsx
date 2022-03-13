import React from 'react'
import { Range, getTrackBackground } from "react-range";
import styled from 'styled-components';

const SliderWrapper = styled('div') <{ min: number, max: number, values: number[] }>`
  height: 2rem;
  display: flex;
  width: 50%;
  
  & > .slider-background {
    height: 1rem;
    width: 100%;
    border-radius: 4px;
    background: ${props =>
    getTrackBackground({
      values: props.values,
      min: props.min,
      max: props.max,
      colors: ["#ccc", "#548BF4", "#ccc"],
    })};
    align-self: center;
  }
`;

const SliderThumb = styled('div')`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  border: 1px solid #548BF4;
  background-color: #FFF;
  display: flex;
  justify-content: center;
  align-self: center;
  boxShadow: 0px 2px 6px #AAA;

  & > div {
    display: flex;
    align-items: center;
  }
`;

interface Props {
  min: number;
  max: number;
  step: number;
  values: number[];
  handleRangeSlider: (values: number[]) => void;
}

const RangeSlider: React.FC<Props> = ({ min, max, step, values, handleRangeSlider }) => {
  return (<Range
    values={values}
    step={step}
    min={min}
    max={max}
    onChange={handleRangeSlider}
    renderTrack={({ props, children }) => (
      <SliderWrapper
        onMouseDown={props.onMouseDown}
        onTouchStart={props.onTouchStart}
        min={min}
        max={max}
        values={values}
      >
        <div ref={props.ref} className='slider-background'>
          {children}
        </div>
      </SliderWrapper>
    )}
    renderThumb={({ props }) => (
      <SliderThumb {...props} >
        <div>{values}</div>
      </SliderThumb>
    )}
  />)
};

export default RangeSlider;