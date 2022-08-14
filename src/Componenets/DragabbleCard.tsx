
import React from "react";
import { Draggable } from "react-beautiful-dnd"
import styled from "styled-components"

const Card = styled.div`
  border-radius : 5px;
  padding : 10px;
  margin-bottom : 5px;
  background-color : ${props => props.theme.cardColor};
`

interface IDragabbleCardProps {
  toDo : string;
  index : number;
}

function DragabbleCard({ toDo, index } : IDragabbleCardProps) {
  // console.log(toDo, "has been rendered")
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic) => (
        <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
          {toDo}
        </Card>
      )}
    </Draggable>
  )
}

export default React.memo(DragabbleCard);

/*

  dnd를 사용할때 렌더링이 다시 되는것때문에
  글자가 흔들리는 오류가 있다. 이 부분을 수정하려고 
  컴포넌트 단위로 잘라서 다시 만듬

  react.js에서 component의 state가 변하면
  해당 component의 child는 다시 렌더링 되기 때문

  console.log(toDo, "has been rendered")
  얼마나 렌더링 되는지 찍어보면 움직일때 엄청나게 많은 렌더링이 된다

  현재 예를들어 e만 옮겨보았는데도 a,b,c 이런것들도 다시 렌더링 되고있다
  이것은 리액트의 기본적인 방식
  Droppable, Board, DragDropContext등 부모 State가 바뀌고있기 때문
  parent가 새로고침되면 당연히 child도 바뀌는게 맞다
  하지만 필요하지 않을때가 있을 수 있다

  그래서 react memo를 사용 
  react에게 이 component는 props가 변하지 않는이상
  렌더링하지 말라고 말하는역할을 한다

  현재같은 상황에선 prop이 같다면 element를 렌더링 하지 않게
  export에 React.memo를 쓰고 component를 Memo안에 넣음
  그렇게 된다면 
  prop을 바꾼 경우 바꾼 item들만 다시 렌더링된다
  

*/