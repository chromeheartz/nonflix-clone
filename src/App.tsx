import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  display : flex;
  max-width : 480px;
  width : 100%;
  margin : 0 auto;
  justify-content : center;
  align-items : center;
  height : 100vh;
`

const Boards = styled.div`
  display : grid;
  width : 100%;
  grid-template-columns : repeat(1, 1fr);
`

const Board = styled.div`
  padding : 20px 10px;
  padding-top : 30px;
  background-color : ${props => props.theme.boardColor};
  border-radius :5px;
  min-height : 200px;
`

const Card = styled.div`
  border-radius : 5px;
  padding : 10px;
  margin-bottom : 5px;
  background-color : ${props => props.theme.cardColor};
`

const toDos = ["a", "b", "c", "d", "e", "f"]

function App() {

  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo,index) => (
                  <Draggable draggableId={toDo} index={index}>
                    {(magic) => (
                      <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
                        {toDo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

/*
  DragDropContext는 onDragEnd라는 필수 props가 있다.
  유저가 드래그를 끝낸 시점에 불려지는 함수

  Droppable은 우리가 어떤것을 드롭할 수 있는 영역을 의미
  Draggable은 우리가 드래그할 수 있는 영역을 의미

  *** Droppable

  Droppable은 droppableId라는 prop을 필수로한다.
  이건 유저가 드롭할 수 있는 영역이 여러개일 수 있기 때문에

  * droppable의 children은 react element여선 안된다
  함수가 되어야함
  <ul></ul>이 아닌 {() => <ul></ul>}
  이렇게 해야 하는 이유는 Droppable안에 component를 넣으면 바로 사용할 수 있는
  무언가를 얻는다

  인자로 들어갈것들 중 첫번째 인자는
  provided다. (magic)이라고도 불림

  droppable에서는 ref와 magic안에 있는 props를 빼주었고

  draggable에서도 마찬가지로 magic안의 props를 빼주었다.
  draggableProps는 기본적으로요소가 드래그 되기를 원하는것이고,
  dragHandleProps는 코너를 잡고만 드래그 되기를 원하는것

  특정부분만 움직일수 있도록 잡아줄 수 있다
  얘를들어 span을 하나 만들고 속성으로 {...magic.dragHandleProps} 를 주면
  기존에 텍스트에서 드래그가 되었던게 안되고 저 이모지에서만 가능해진다.

  # 6.4
  map으로 각 컴포넌트를 잘 뿌려주는데 드래그 할때마다
  뒤의 영역이 계속 작아졌다 커졌다를 반복하는데 그 애니메이션이 필요없다.
  magic을 볼것인데 TS에는 object안, type안을 들여다 볼 수 있게 되어있다.
  Go tot Type definition에 들어가면 실제 magic argument에 무엇이 들어있는지 볼 수 있다.

  placeholder라는 것이 있는데 이것은 Droppable이 끝날때 두는 무언가라서
  사이즈가 이상하게 변하지 않을것이다.
  이상하게 사이즈가 변하는 Board의 끝에서
  {magic.placeholder}를 둘것이다

  

*/