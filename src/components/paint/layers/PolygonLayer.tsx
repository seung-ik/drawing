import React from 'react'
import { Layer, Line, Rect } from 'react-konva';
import Konva from 'konva';

interface Props {
  polygonDots: Konva.RectConfig[];
  polygonLine: Konva.LineConfig;
  handleMouseOver: (e: any) => void;
  handleMouseOut: (e: any) => void;
}
const PolygonLayer: React.FC<Props> = ({
  polygonDots,
  polygonLine,
  handleMouseOver,
  handleMouseOut,
}) => {
  return (
    <Layer>
      {polygonDots.map((value, i) => {
        const startPointAttr =
          i === 0
            ? {
                onMouseOver: handleMouseOver,
                onMouseOut: handleMouseOut,
                style: { zIndex: 999 },
              }
            : null;
        return (
          <Rect
            key={i}
            x={(value.x as number) - 5}
            y={(value.y as number) - 5}
            width={10}
            height={10}
            fill="white"
            stroke="black"
            {...startPointAttr}
          />
        );
      })}
      {polygonDots.length !== 0 && (
        <Line points={polygonLine?.points} stroke={polygonLine?.strokeColor} strokeWidth={4} closed={false} />
      )}
    </Layer>
  );
};

export default PolygonLayer