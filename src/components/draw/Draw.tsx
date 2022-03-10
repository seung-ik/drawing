import Konva from 'konva';
import React, { useState } from 'react'
import { Stage, Layer, Line, Text, Rect, RegularPolygon } from 'react-konva';

const Draw = () => {
  const [annotations, setAnnotations] = useState<Konva.RectConfig[]>([]);
  const [newAnnotation, setNewAnnotation] = useState<Konva.RectConfig[]>([]);

  const handleMouseDown = (event: any) => {
    if (newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  const handleMouseUp = (event: any) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x as number;
      const sy = newAnnotation[0].y as number;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: annotations.length + 1
      };
      annotations.push(annotationToAdd);
      setNewAnnotation([]);
      setAnnotations(annotations);
    }
  };

  const handleMouseMove = (event: any) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x as number;
      const sy = newAnnotation[0].y as number;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0"
        }
      ]);
    }
  };

  const annotationsToDraw = [...annotations, ...newAnnotation];
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <RegularPolygon radius={30} sides={10} x={100} y={100} width={100} height={100} fill="red" shadowBlur={5} />
      </Layer>
    </Stage>
  );
}

export default Draw