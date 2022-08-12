import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {

  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(magic) => (
            <ul ref={magic.innerRef} {...magic.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(magic) => (
                  <li ref={magic.innerRef} {...magic.draggableProps}>
                    <span {...magic.dragHandleProps}>💦</span>
                    One
                  </li>
                )}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {(magic) => (
                  <li ref={magic.innerRef} {...magic.draggableProps}>
                    <span {...magic.dragHandleProps}>💦</span>
                    Two
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
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

*/