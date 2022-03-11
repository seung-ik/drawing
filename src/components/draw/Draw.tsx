import Konva from 'konva';
import React, { useState } from 'react'
import { Stage, Layer, Line, Text, Rect, RegularPolygon } from 'react-konva';

const Draw = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Line stroke="black" points={[50, 50, 200, 50, 200, 200, 50, 200]} bezier />
        {/* <Line stroke="black" points={[0, 0, 100, 0, 100, 100, 300, 300]} bezier /> */}
      </Layer>
      <Layer>
        {/* <Text text="Some text on canvas" fontSize={15} />
        <Rect x={20} y={50} width={100} height={100} fill="red" shadowBlur={10} />
        <Circle x={200} y={100} radius={50} fill="green" /> */}
        <Line
          x={200}
          y={200}
          points={[0, 0, 100, 0, 100, 100,300,300]}
          // tension={0.6}
          bezier
          stroke="black"
          // fillLinearGradientStartPoint={{ x: -50, y: -50 }}
          // fillLinearGradientEndPoint={{ x: 50, y: 50 }}
          // fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
        />
      </Layer>
    </Stage>
  );
}

export default Draw