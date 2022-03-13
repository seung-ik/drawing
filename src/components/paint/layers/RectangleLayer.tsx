import Konva from 'konva';
import React from 'react'
import { Layer, Rect } from 'react-konva';

interface Props {
  rectangles: Konva.RectConfig[];
}

const RectangleLayer: React.FC<Props> = ({ rectangles }) => {
  return (
    <Layer>
      {rectangles.map((value, i) => {
        return (
          <Rect
            key={i}
            x={value.x}
            y={value.y}
            width={value.width}
            height={value.height}
            fill="transparent"
            stroke={value.strokeColor}
            strokeWidth={value.strokeWidth}
          />

        );
      })}
    </Layer>
  )
}

export default RectangleLayer