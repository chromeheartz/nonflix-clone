import React from "react"
import { useRecoilValue } from "recoil";
import { toDoState } from "../todoAtoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

// atom으로부터 값을 불러옴. 값만 가져오고싶을때
// const value = useRecoilValue(toDoState);
// atom의 값을 수정할 수 있음. 수정하는 함수만 쓰고싶을때
// const modFn = useSetRecoilState(toDoState);


function ToDoList() {
  // useState와 비슷함. 값, 값을 수정하는 함수
  const toDos = useRecoilValue(toDoState)
  
  return (
      <div>
        <h1>To Dos</h1>
        <hr />
        <CreateToDo />
        <ul>
          {/* 
            {toDos.map((toDo) => <ToDo text={toDo.text} category={toDo.category} id={toDo.id}/>)} 

            이렇게 써도 작동하는 이뉴는 toDos배열의 toDo원소 하나하나가
            toDo컴포넌트에 필요한 props와 같은 모양이기 때문. 
          */}
          
          {toDos.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
        </ul>
      </div>
    )
}

export default ToDoList