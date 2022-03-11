import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Stage } from 'react-konva';
import Konva from 'konva';
import useWindowSize from 'src/hooks/useWindowResize';
import { polygonDotsState, polygonLineState, useDrawPolygon } from 'src/state/polygonState';
import { drawingTypeState, strokeColorState } from 'src/state/toolState';
import { circlesState, useDrawCircle } from 'src/state/circleState';
import Tool from './tools/Tool';
import PolygonLayer from './layers/PolygonLayer';
import LineLayer from './layers/LineLayer';
import RectangleLayer from './layers/RectangleLayer';
import CircleLayer from './layers/CircleLayer';
import { Wrapper } from './Paint.style';
import { rectanglesState, useDrawRectangle } from 'src/state/rectangleState';
import { paintInfoState } from 'src/state/paintInfoState';
import { linesState, useDrawLine, useDrawPencil } from 'src/state/lineState';
import CurveLineLayer from './layers/CurveLineLayer';
import { curveLineDotsState, curveLineState, useDrawCurveLine } from 'src/state/curveLineState';

const Paint = () => {
  const windowSize = useWindowSize();
  const drawingType = useRecoilValue(drawingTypeState);
  const strokeColor = useRecoilValue(strokeColorState);
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);

  const lines = useRecoilValue(linesState);
  const rectangles = useRecoilValue(rectanglesState);
  const circles = useRecoilValue(circlesState);
  const polygonDots = useRecoilValue(polygonDotsState);
  const polygonLine = useRecoilValue(polygonLineState);
  const curveLineDots = useRecoilValue(curveLineDotsState);
  const curveLine = useRecoilValue(curveLineState);

  const { handlePencilMouseDown, handlePencilMouseMove, handlePencilMouseUp } = useDrawPencil()
  const { handleLineMouseDown, handleLineMouseMove } = useDrawLine();
  const { handleRectMouseDown, handleRectMouseMove, handleRectMouseUp } = useDrawRectangle();
  const { handleCircleMouseDown, handleCircleMouseMove, handleCircleMouseUp } = useDrawCircle();
  const { handlePolygonMouseDown, handlePolygonMouseOver, handlePolygonMouseOut, handlePolygonMouseMove } = useDrawPolygon();
  const { handleCurveLineMouseDown, handleCurveLineMouseMove, handleCurveLineMouseOver, handleCurveLineMouseOut } = useDrawCurveLine();

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const { x, y } = (e.target.getStage() as Konva.Stage).getPointerPosition() as Konva.Vector2d;
    switch (drawingType) {
      case 'pencil':
        handlePencilMouseDown(x, y, strokeColor);
        break;
      case 'line':
        handleLineMouseDown(x, y, strokeColor);
        break;
      case 'curve':
        handleCurveLineMouseDown(x, y, strokeColor);
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
      case 'pencil':
        handlePencilMouseMove(x, y);
        break;
      case 'line':
        handleLineMouseMove(x, y);
        break;
      case 'curve':
        handleCurveLineMouseMove(x, y, strokeColor)
        break;
      case 'polygon':
        handlePolygonMouseMove(x, y, strokeColor)
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
      case 'pencil':
        handlePencilMouseUp(x, y)
        break;
      case 'line':
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

  useLayoutEffect(() => {
    const savedPaintInfo = sessionStorage.getItem('paintInfo');
    if (savedPaintInfo) {
      setPaintInfo(JSON.parse(savedPaintInfo));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('paintInfo', JSON.stringify(paintInfo));
  }, [paintInfo]);

  return (
    <Wrapper>
      <Stage
        className="screen"
        width={windowSize.width * 0.9}
        height={windowSize.height * 0.6}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <LineLayer lines={lines} />
        <RectangleLayer rectangles={rectangles} />
        <CircleLayer circles={circles} />
        <CurveLineLayer
          curveLineDots={curveLineDots}
          curveLine={curveLine}
          handleMouseOver={handleCurveLineMouseOver}
          handleMouseOut={handleCurveLineMouseOut}
        />
        <PolygonLayer
          polygonDots={polygonDots}
          polygonLine={polygonLine}
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