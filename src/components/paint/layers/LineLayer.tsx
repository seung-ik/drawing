import Konva from 'konva';
import React from 'react'
import { Layer, Line } from 'react-konva';

interface Props {
  lines: Konva.LineConfig[];
}

const LineLayer: React.FC<Props> = ({ lines }) => {
  return (
    <Layer>
      {lines.map((value, i) => (
        <Line
          key={i}
          points={value.points}
          stroke={value.strokeColor}
          strokeWidth={value.strokeWidth}
          closed={value.closed}
          tension={value.tension}
          bezier={value.bezier}
          // tension={0.3}
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