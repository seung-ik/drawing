import React from 'react';
import Konva from 'konva';
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
            key={value.key}
            x={value.x}
            y={value.y}
            radius={value.radius}
            stroke={value.strokeColor}
            strokeWidth={value.strokeWidth}
            fill="transparent"
          />
        );
      })}
    </Layer>
  );
};

export default CircleLayer;
