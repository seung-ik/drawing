import Konva from 'konva';
import React from 'react'
import { Layer, Rect } from 'react-konva';

interface Props {
  rectangles: Konva.RectConfig[];
  paintColor: string;
}

const RectangleLayer: React.FC<Props> = ({ rectangles, paintColor }) => {
  return (
    <Layer>
      {rectangles.map((value, i) => {
        return (
          <>
            {console.log(value)}
            <Rect
              key={i}
              x={value.x}
              y={value.y}
              width={value.width}
              height={value.height}
              fill="transparent"
              stroke={value.strokeColor}
            />
          </>
        );
      })}
    </Layer>
  )
}

export default RectangleLayer