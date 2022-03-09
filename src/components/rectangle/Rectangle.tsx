import React from 'react'
import { Layer, Rect } from 'react-konva'

const Rectangle = () => {
  return (
    <Layer>
      <Rect
        x={20}
        y={50}
        width={100}
        height={100}
        fill="#3f51b5"
        draggable
      />

    </Layer>
  )
}

export default Rectangle