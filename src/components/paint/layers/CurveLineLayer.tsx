import React from 'react'
import { Layer, Line ,Circle } from 'react-konva';
import Konva from 'konva';

interface Props {
  curveLineDots: Konva.CircleConfig[];
  curveLine: Konva.LineConfig;
  handleMouseOver: (e: any) => void;
  handleMouseOut: (e: any) => void;
}
const CurveLineLayer: React.FC<Props> = ({
  curveLineDots,
  curveLine,
  handleMouseOver,
  handleMouseOut,
}) => {
  return (
    <Layer>
      {curveLineDots.map((value, i) => {
        const endPointAttr =
          i === curveLineDots.length - 1
            ? {
                onMouseOver: handleMouseOver,
                onMouseOut: handleMouseOut,
              }
            : null;
        return <Circle key={i} x={value.x} y={value.y} radius={10} fill="white" stroke="black" {...endPointAttr} />;
      })}
      {curveLineDots.length !== 0 && (
        <Line points={curveLine?.points} stroke={curveLine?.strokeColor} strokeWidth={4} closed={false} tension={0.5} />
      )}
    </Layer>
  );
};

export default CurveLineLayer;