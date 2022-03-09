import Konva from 'konva';
import React, { useState, useRef } from 'react'
import { default as ColorPicker } from 'react-color/lib/components/circle/Circle';
import { Stage } from 'react-konva';
import { COLOR_PICKER_LIST } from 'src/asset';
import useWindowSize from 'src/hooks/useWindowResize';
import LineLayer from './layers/LineLayer';
import { Buttons, Wrapper } from './Paint.style';
import RectangleLayer from './layers/RectangleLayer';

const Paint = () => {
  const [lines, setLines] = useState<Konva.LineConfig[]>([]);

  const [prevRects, setPrevRects] = useState<Konva.RectConfig[]>([]);
  const [newRect, setNewRect] = useState<Konva.RectConfig[]>([]);
  const rectangles: Konva.RectConfig[] = [...prevRects, ...newRect];

  const [tool, setTool] = useState('line');
  const [paintColor, setPaintColor] = useState('black');
  const isDrawing = useRef(false);
  const windowSize = useWindowSize();

  const handleDrawingTool = (e: React.MouseEvent<HTMLElement>) => {// recoil 로 상태관리하ㅗ 컴포넌트 분리해주기
    const element = e.target as HTMLButtonElement
    setTool(element.value)
  }

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => { //나중에 함수만들어서 컴포넌트에서 가져다가 쓰기
    isDrawing.current = true;
    const { x, y } = (e.target.getStage() as Konva.Stage).getPointerPosition() as Konva.Vector2d;
    switch (tool) {
      case 'line':
        setLines([...lines, { tool, points: [x, y], strokeColor: paintColor }]);
        break;
      case 'arc':
        break;
      case 'polygon':
        break;
      case 'rectangle':
        if (newRect.length === 0) {
          setNewRect([{ x, y, width: 0, height: 0, strokeColor: paintColor, key: "0" }]);
        }
        break;
      case 'circle':
        break;
      default:
        setLines([...lines, { tool, points: [x, y] }]);
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current && tool === 'line') { //이거드로잉 툴별로 check 필요ㅗ
      return;
    }

    const { x, y } = (e.target.getStage() as Konva.Stage).getPointerPosition() as Konva.Vector2d;
    let lastLine = lines[lines.length - 1];
    switch (tool) {
      case 'line':
        lastLine.points = lastLine.points?.concat([x, y]);
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
        break;
      case 'arc':
        break;
      case 'polygon':
        break;
      case 'rectangle':
        if (newRect.length === 1) {
          const startX = newRect[0].x as number;
          const startY = newRect[0].y as number;
          setNewRect([
            {
              x: startX,
              y: startY,
              width: x - startX,
              height: y - startY,
              key: "0",
              strokeColor: paintColor
            }
          ]);
        }
        break;
      case 'circle':
        break;
      default:
        lastLine.points = lastLine.points?.concat([x, y]);
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    }
  };

  const handleMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = false;
    const { x, y } = (e.target.getStage() as Konva.Stage).getPointerPosition() as Konva.Vector2d;
    switch (tool) {
      case 'line':
        break;
      case 'arc':
        break;
      case 'polygon':
        break;
      case 'rectangle':
        if (newRect.length === 1) {
          const startX = newRect[0].x as number;
          const startY = newRect[0].y as number;
          const completedRect = {
            x: startX,
            y: startY,
            width: x - startX,
            height: y - startY,
            key: prevRects.length + 1,
            strokeColor: paintColor
          };
          setNewRect([]);
          setPrevRects(prev => prev.concat(completedRect));
        }
        break;
      case 'circle':
        break;
      default:
    }
  };

  const handleChangePaintColor = (e: any) => { // tool 관련 컴포넌트 만들고 거기로 이동, recoil
    setPaintColor(e.hex)
  }

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
        <LineLayer lines={lines} paintColor={paintColor} />
        <RectangleLayer rectangles={rectangles} paintColor={paintColor} />

      </Stage>
      <div className="set-tools">
        <ColorPicker
          colors={COLOR_PICKER_LIST}
          color={paintColor}
          onChangeComplete={handleChangePaintColor}
        />
        <Buttons onClick={handleDrawingTool} color={paintColor}>
          <button className={tool === "line" ? "hilight" : ""} value="line">직선</button>
          <button className={tool === "arc" ? "hilight" : ""} value="arc">곡선</button>
          <button className={tool === "polygon" ? "hilight" : ""} value="polygon">다각형</button>
          <button className={tool === "rectangle" ? "hilight" : ""} value="rectangle">사각형</button>
          <button className={tool === "circle" ? "hilight" : ""} value="circle">원</button>
        </Buttons>
      </div>
    </Wrapper>
  );
}

export default Paint