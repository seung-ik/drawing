import React from 'react'
import { useRecoilState } from 'recoil';
import { paintInfoState, undoListState } from 'src/state/paintInfoState';
import { Buttons } from '../Paint.style'

const RelatedPaintInfoBtn = () => {
  const [paintInfo, setPaintInfo] = useRecoilState(paintInfoState);
  const [undoList, setUndoList] = useRecoilState(undoListState);
  const isCanUndo = paintInfo.length > 0 && undoList.length < 40;
  const isCanRedo = undoList.length > 0;
  const backBtnText = undoList.length > 0 ? `뒤로 돌리기 (${undoList.length}/40)` : '뒤로 돌리기';

  const handlePaintInfo = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.target as HTMLButtonElement;
    if (element.value === "delete") {
      setPaintInfo([]);
      setUndoList([]);
    } else if (element.value === 'undo' && isCanUndo) {
      const lastIndex = paintInfo.length - 1
      const lastPaintInfo = paintInfo[lastIndex];
      setUndoList(prev => prev.concat(lastPaintInfo))
      setPaintInfo(prev => prev.slice(0, lastIndex))
    } else if (element.value === 'redo' && isCanRedo) {
      const lastIndex = undoList.length - 1;
      const lastUndoInfo = undoList[lastIndex];
      setPaintInfo(prev => prev.concat(lastUndoInfo));
      setUndoList(prev => prev.slice(0, lastIndex))
    }
  }

  return (
    <Buttons onClick={handlePaintInfo}>
      <button value="delete">삭제</button>
      <button disabled={!isCanUndo} value="undo">{backBtnText}</button>
      <button disabled={!isCanRedo} value="redo">앞으로 돌리기</button>
    </Buttons>
  )
}

export default React.memo(RelatedPaintInfoBtn);