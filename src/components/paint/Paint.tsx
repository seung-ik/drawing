import React, { useState, useRef } from 'react'
import { useRecoilValue } from 'recoil';
import { Stage } from 'react-konva';
import Konva from 'konva';
import useWindowSize from 'src/hooks/useWindowResize';
import { polygonDotsState, polygonLineState, polygonsState, useDrawPolygon } from 'src/state/polygonState';
import { drawingTypeState, strokeColorState } from 'src/state/toolState';
import { circlesState, useDrawCircle } from 'src/state/circleState';
import Tool from './tools/Tool';
import PolygonLayer from './layers/PolygonLayer';
import LineLayer from './layers/LineLayer';
import RectangleLayer from './layers/RectangleLayer';
import CircleLayer from './layers/CircleLayer';
import { Wrapper } from './Paint.style';
import { rectanglesState, useDrawRectangle } from 'src/state/rectangleState';

const Paint = () => {
  const windowSize = useWindowSize();
  const drawingType = useRecoilValue(drawingTypeState);
  const strokeColor = useRecoilValue(strokeColorState);

  const [lines, setLines] = useState<Konva.LineConfig[]>([]);
  const isDrawing = useRef(false);

  const rectangles = useRecoilValue(rectanglesState);
  const circles = useRecoilValue(circlesState);
  const polygonDots = useRecoilValue(polygonDotsState);
  const polygonLine = useRecoilValue(polygonLineState);
  const polygons = useRecoilValue(polygonsState);
  const { handleRectMouseDown, handleRectMouseMove, handleRectMouseUp} = useDrawRectangle();
  const { handleCircleMouseDown, handleCircleMouseMove, handleCircleMouseUp } = useDrawCircle();
  const { handlePolygonMouseDown, handlePolygonMouseOver, handlePolygonMouseOut } = useDrawPolygon();

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const { x, y } = (e.target.getStage() as Konva.Stage).getPointerPosition() as Konva.Vector2d;
    switch (drawingType) {
      case 'line':
        isDrawing.current = true;
        setLines([...lines, { points: [x, y], strokeColor }]);
        break;
      case 'curve':
        break;
      case 'polygon':
        handlePolygonMouseDown(x, y, strokeColor);
        break;
      case 'rectangle':
        handleRectMouseDown(x, y);
        break;
      case 'circle':
        handleCircleMouseDown(x, y);
        break;
      default:
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const { x, y } = (e.target.getStage() as Konva.Stage).getPointerPosition() as Konva.Vector2d;
  
    switch (drawingType) {
      case 'line':
        if (!isDrawing.current) {
          return;
        }
        let lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points?.concat([x, y]);
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
        break;
      case 'curve':
        break;
      case 'polygon':
        break;
      case 'rectangle':
        handleRectMouseMove(x, y, strokeColor);
        break;
      case 'circle':
        handleCircleMouseMove(x, y, strokeColor);
        break;
      default:
    }
  };

  const handleMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const { x, y } = (e.target.getStage() as Konva.Stage).getPointerPosition() as Konva.Vector2d;
    switch (drawingType) {
      case 'line':
        isDrawing.current = false;
        break;
      case 'curve':
        break;
      case 'polygon':
        break;
      case 'rectangle':
        handleRectMouseUp(x, y, strokeColor);
        break;
      case 'circle':
        handleCircleMouseUp(x, y, strokeColor);
        break;
      default:
    }
  };

  return (
    <Wrapper>
      <Stage
        className="screen"
        width={windowSize.width * 0.9}
        height={400}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <LineLayer lines={lines} />
        <RectangleLayer rectangles={rectangles} />
        <CircleLayer circles={circles} />
        <PolygonLayer
          polygonDots={polygonDots}
          polygonLine={polygonLine}
          polygons={polygons}
          handleMouseOver={handlePolygonMouseOver}
          handleMouseOut={handlePolygonMouseOut}
        />
      </Stage>
      <div className="tools">
        <Tool strokeColor={strokeColor} drawingType={drawingType} />
      </div>
    </Wrapper>
  );
}

export default Paint