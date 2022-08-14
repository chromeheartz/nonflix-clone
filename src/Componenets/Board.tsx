import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import DragabbleCard from "./DragabbleCard"

const Wrapper = styled.div`
  width : 300px;
  padding-top : 10px;
  background-color : ${props => props.theme.boardColor};
  border-radius :5px;
  min-height : 300px;
  display : flex;
  flex-direction : column;
`

interface IAreaProps {
  isDraggingFromThis : boolean;
  isDraggingOver : boolean;
}
// Area는 그냥 div이기 때문에 props를 받을수없어서
// isDraggingOver라는 prop을 받을것이라고 말하는것
// const Area = styled.div<{isDraggingOver : boolean}>`
const Area = styled.div<IAreaProps>`
  background-color : ${props => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
  flex-grow : 1;
  transition : background-color 0.3s ease-in-out;
  padding : 20px;
`

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`

interface IBoardProps {
  // string으로 이루어진 array 라는뜻
  toDos : string[];
  boardId : string;
}

function Board({ toDos, boardId } : IBoardProps){
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {/*
          두번쨰 argument

          info 의 오른쪽클릭 type definition을 보면
          type정의에 뭘 얻을지 알 수 있다.
        */}
        {(magic, info) => (
          <Area 
            isDraggingOver={info.isDraggingOver}
            // 안의 값이 string이던 뭐던 true가 되고, undefined거나 null이면 false
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard key={toDo} index={index} toDo={toDo} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  )
}

export default Board

