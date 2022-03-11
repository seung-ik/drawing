import Konva from 'konva';
import React from 'react'
import { Layer, Circle } from 'react-konva';

interface Props {
  circles: Konva.CircleConfig[];
}

const CircleLayer: React.FC<Props> = ({ circles }) => {
  return (
    <Layer>
      {circles.map((value, i) => {
        return (
          <Circle
            x={value.x}
            y={value.y}
            radius={value.radius}
            fill='transparent'
            stroke={value.strokeColor}
            key={i}
          />

        );
      })}
    </Layer>
  )
}

export default CircleLayer