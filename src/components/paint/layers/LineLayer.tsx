import Konva from 'konva';
import React from 'react'
import { Layer, Line } from 'react-konva';

interface Props {
  lines: Konva.LineConfig[];
}

const LineLayer: React.FC<Props> = ({ lines }) => {
  return (
    <Layer>
      {lines.map((value) => (
        <Line
          key={value.key}
          points={value.points}
          stroke={value.strokeColor}
          strokeWidth={value.strokeWidth}
          closed={value.closed}
          tension={value.tension}
          bezier={value.bezier}
          lineCap="round"
        />
      ))}
    </Layer>
  )
}

export default LineLayer