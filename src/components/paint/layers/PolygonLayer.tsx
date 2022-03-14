import React from 'react';
import Konva from 'konva';
import { Layer, Line, Rect } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';

interface Props {
  polygonDots: Konva.RectConfig[];
  polygonLine: Konva.LineConfig;
  handleMouseOver: (e: KonvaEventObject<MouseEvent>) => void;
  handleMouseOut: (e: KonvaEventObject<MouseEvent>) => void;
}
const PolygonLayer: React.FC<Props> = ({ polygonDots, polygonLine, handleMouseOver, handleMouseOut }) => {
  return (
    <Layer>
      {polygonDots.map((value, i) => {
        const startPointAttr =
          i === 0
            ? {
                onMouseOver: handleMouseOver,
                onMouseOut: handleMouseOut,
              }
            : null;
        return (
          <Rect
            key={value.key}
            x={(value.x as number) - 10}
            y={(value.y as number) - 10}
            width={20}
            height={20}
            fill="white"
            stroke="black"
            {...startPointAttr}
          />
        );
      })}
      {polygonDots.length !== 0 && (
        <Line
          key={polygonLine.key}
          points={polygonLine.points}
          stroke={polygonLine.strokeColor}
          strokeWidth={polygonLine.strokeWidth}
          closed={false}
        />
      )}
    </Layer>
  );
};

export default PolygonLayer;
