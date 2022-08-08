import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../todoAtoms";

function ToDo({ text, category, id } : IToDo) {
  // atom을 수정하는 함수
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget : { name }
    } = event;
    setToDos(oldToDos => {
      // findIndex의 안에서는 조건을 만족하는 todo의 index를 찾아줄것이다
      // 조건은 함수로 표현
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id)
      const oldToDo = oldToDos[targetIndex];
      // as any 라고 하면 타입스크립트 한테 너 나 못믿어? 걍 해 ㅋ 이런뜻이됨
      // 타입스크립트의 체크를 피할 수 있음.
      const newToDo = {text, id, category : name as any};
      return [
        ...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)
      ];
    })
  }
  return (
    <li>
      <span>{text}</span>
      {category !== "TO_DO" && (
        <button name="TO_DO"onClick={onClick}>To Do</button>
      )}
      {category !== "DOING" && (
        <button name="DOING"onClick={onClick}>Doing</button>
      )}
      {category !== "DONE" && (
        <button name="DONE"onClick={onClick}>Done</button>
      )}
    </li>
  )
}

export default ToDo;