import React, { useEffect, useLayoutEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Konva from 'konva';
import { Layer, Stage, Circle, Rect } from 'react-konva';
import useWindowSize from 'src/hooks/useWindowResize';
import { useDrawPolygon } from 'src/state/polygonState';
import { drawingTypeState, strokeColorState } from 'src/state/toolState';
import { useDrawCircle } from 'src/state/circleState';
import { useDrawRectangle } from 'src/state/rectangleState';
import { paintInfoState, tempDotState } from 'src/state/paintInfoState';
import { tempLineState, useDrawLine, useDrawPencil } from 'src/state/lineState';
import { useDrawCurveLine } from 'src/state/curveLineState';
import LineLayer from './layers/LineLayer';
import RectangleLayer from './layers/RectangleLayer';
import CircleLayer from './layers/CircleLayer';
import Tools from './tools/Tools';
import { Wrapper } from './Paint.style';

const Paint = () => {
  const windowSize = useWindowSize();
  const drawingType = useRecoilValue(drawingTypeState);
  const strokeColor = useRecoilValue(strokeColorState);

  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);
  const [tempDot, setTempDot] = useRecoilState(tempDotState);
  const tempLine = useRecoilValue(tempLineState);

  const { handlePencilMouseDown, handlePencilMouseMove, handlePencilMouseUp } = useDrawPencil();
  const { handleLineMouseDown, handleLineMouseMove } = useDrawLine();
  const { handleRectMouseDown, handleRectMouseMove, handleRectMouseUp } = useDrawRectangle();
  const { handleCircleMouseDown, handleCircleMouseMove, handleCircleMouseUp } = useDrawCircle();
  const { handlePolygonMouseDown, handlePolygonMouseOver, handlePolygonMouseOut, handlePolygonMouseMove } =
    useDrawPolygon();
  const { handleCurveLineMouseDown, handleCurveLineMouseMove, handleCurveLineMouseOver, handleCurveLineMouseOut } =
    useDrawCurveLine();

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>): void => {
    const { x, y } = (e.target.getStage() as Konva.Stage).getPointerPosition() as Konva.Vector2d;
    switch (drawingType) {
      case 'pencil':
        handlePencilMouseDown(x, y);
        break;
      case 'line':
        handleLineMouseDown(x, y);
        break;
      case 'curve':
        handleCurveLineMouseDown(x, y);
        break;
      case 'polygon':
        handlePolygonMouseDown(x, y);
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

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>): void => {
    const { x, y } = (e.target.getStage() as Konva.Stage).getPointerPosition() as Konva.Vector2d;
    switch (drawingType) {
      case 'pencil':
        handlePencilMouseMove(x, y);
        break;
      case 'line':
        handleLineMouseMove(x, y);
        break;
      case 'curve':
        handleCurveLineMouseMove(x, y);
        break;
      case 'polygon':
        handlePolygonMouseMove(x, y);
        break;
      case 'rectangle':
        handleRectMouseMove(x, y);
        break;
      case 'circle':
        handleCircleMouseMove(x, y);
        break;
      default:
    }
  };

  const handleMouseUp = (e: Konva.KonvaEventObject<MouseEvent>): void => {
    const { x, y } = (e.target.getStage() as Konva.Stage).getPointerPosition() as Konva.Vector2d;
    switch (drawingType) {
      case 'pencil':
        handlePencilMouseUp(x, y);
        break;
      case 'rectangle':
        handleRectMouseUp(x, y);
        break;
      case 'circle':
        handleCircleMouseUp(x, y);
        break;
      default:
    }
  };

  useLayoutEffect(() => {
    const savedPaintInfo = sessionStorage.getItem('paintInfo');
    if (savedPaintInfo) {
      setPaintInfo(JSON.parse(savedPaintInfo));
    }
  }, [setPaintInfo]);

  useEffect(() => {
    sessionStorage.setItem('paintInfo', JSON.stringify(paintInfo));
  }, [paintInfo]);

  useEffect(() => {
    setTempDot([]);
  }, [drawingType]);

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
        {tempLine.map((info)=>{
          return <LineLayer lines={[info]} />
        })}
        {paintInfo.map((info) => {
          if (info.type === 'rectangle' || info.type === 'tempRectangle') {
            return <RectangleLayer rectangles={[info]} />;
          } else if (info.type === 'circle'|| info.type === 'tempCircle') {
            return <CircleLayer circles={[info]} />;
          } else {
            return <LineLayer lines={[info]} />;
          }
        })}
        {console.log(paintInfo,'PaintInfo')}
        {tempDot.map((info, i) => {
          if (info.type === 'tempCircleDot') {
            const endPointAttr =
              i === tempDot.length - 1
                ? {
                    onMouseOver: handleCurveLineMouseOver,
                    onMouseOut: handleCurveLineMouseOut,
                  }
                : null;

            return (
              <Layer>
                <Circle
                  key={info.key}
                  x={info.x}
                  y={info.y}
                  radius={10}
                  fill="white"
                  stroke="black"
                  {...endPointAttr}
                />
              </Layer>
            );
          } else if (info.type === 'tempRectDot') {
            const startPointAttr =
              i === 0
                ? {
                    onMouseOver: handlePolygonMouseOver,
                    onMouseOut: handlePolygonMouseOut,
                  }
                : null;

            return (
              <Layer>
                <Rect
                  key={info.key}
                  x={(info.x as number) - 10}
                  y={(info.y as number) - 10}
                  width={20}
                  height={20}
                  fill="white"
                  stroke="black"
                  {...startPointAttr}
                />
              </Layer>
            );
          }
        })}
        
      </Stage>
      <div className="tools">
        <Tools strokeColor={strokeColor} drawingType={drawingType} />
      </div>
    </Wrapper>
  );
};

export default Paint;
