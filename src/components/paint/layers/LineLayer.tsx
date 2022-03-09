import Konva from 'konva';
import React from 'react'
import { Layer, Line } from 'react-konva';

interface Props {
  lines: Konva.LineConfig[];
  paintColor?: string;
}

const LineLayer: React.FC<Props> = ({ lines, paintColor }) => {
  return (
    <Layer>
      {lines.map((value, i) => (
        <Line
          key={i}
          points={value.points}
          stroke={value.strokeColor}
          strokeWidth={10}
          tension={0.3}
          lineCap="round"
        // globalCompositeOperation={
        //   value.tool === 'eraser' ? 'destination-out' : 'source-over'
        // }
        />
      ))}
    </Layer>
  )
}

export default LineLayer