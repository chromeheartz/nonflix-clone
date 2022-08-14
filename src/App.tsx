import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDostate } from "./atoms";
import Board from "./Componenets/Board";

const Wrapper = styled.div`
  display : flex;
  max-width : 680px;
  width : 100%;
  margin : 0 auto;
  justify-content : center;
  align-items : center;
  height : 100vh;
`

const Boards = styled.div`
  display : grid;
  width : 100%;
  grid-template-columns : repeat(3, 1fr);
  gap : 10px;
`

function App() {
  // return되는 배열의 첫번째는 atom의 값, 두번쨰는 atom을 수정하는함수
  const [toDos, setToDos] = useRecoilState(toDostate)
  // 많은 Argument를 정보로 준다
  const onDragEnd = ({ draggableId, destination, source } : DropResult) => {
    // destination, source 로 어디에서 어디로가는지도 알수있음.
    // dettnation이 없을경우 (같은 자리에 둘경우)
    if(!destination) return
   
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {/*
            IBoardProps.toDos : string[]
            이 arror는 toDos는 string으로 이루어진 array인데
            toDos boardId는 typescript에 의하면 string이 아니여서이다.
            typescript는 현재 to_do, doing, done 이 세가지 선택지밖에 없기 때문
            그래서 typescript에게 toDoState가 무엇인지 알려줄것이다
            나중에 유저가 추가할수도 있기 때문
          */}
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
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


/*
  typescript의 에러수정방법
  onDrageEnd를 보면 어떻게 생겼는지 알려주는데
  result와 provided라는 인수를 return한다.

  그 안의 DropList를 열어보면 destination과 같은 것들을
  다 가져와야 하는것을 볼 수 있을것이다.

  그래서 type을 DropResult로 정해주고 import를 한다

  splice의 두개의 인수는 지우는것을 시작할 위치, 지울아이템의갯수
  세개의 인수는 앞의 두개와 같은데 두번째에 0 을넣고 세번째에 아이템을 넣어주면
  그 자리에 들어간다

  * splice는 그 array 자체를 수정한다

  * setToDos는 atom의 값을 수정할 2가지 방법을 전달해준다.
  하나는 그냥 값을 보내주는것이고
  다른 하나는 현재의 값을 arg로 주고 새로운 state를 return하는 함수를 주는것

  ** 우리가 map을 할때 key 에 Number를 주는것이 익숙하지만
  key와 draggableId는 무조건 같아야한다
*/
/*
  // 1) Delete item on source.index
  console.log("Delete item on", source.index);
  console.log(toDosCopy);
  toDosCopy.splice(source.index, 1);
  console.log("Deleted item");
  console.log(toDosCopy);
  // 2) Put back the item on the destination.index
  console.log("Put back", draggableId, "on ", destination.index);
  toDosCopy.splice(destination?.index, 0, draggableId);
  console.log(toDosCopy);
*/

/*
  object 를 loop하는 방법
  const toDos = {
    x : ["a", "b"],
    z : ["n", "t"]
  }
  이런식의 object가 있는경우
  각 property들을 받아서 그 array를 render하고싶다

  그런때에 Object.keys를 해주면 가진 key만 array로 뽑아준다
  Object.keys(toDos) = ['x', 'z']

  마찬가지로 Object.values(toDos) 하면 value들만 가져온다

  * toDos['x']라고 하면 x의 value값들이 나올것이다
  ["a", "b"]

  Object.keys(toDos).map(boardId => toDos[boardId])
  이런식으로 응용해서 사용해주면
  boardId가 있고 그 boardId가 각각 가지는 자식들도 볼 수 있게 되었다.




*/