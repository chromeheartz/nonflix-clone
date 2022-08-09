import React from "react"
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../todoAtoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

// atom으로부터 값을 불러옴. 값만 가져오고싶을때
// const value = useRecoilValue(toDoState);
// atom의 값을 수정할 수 있음. 수정하는 함수만 쓰고싶을때
// const modFn = useSetRecoilState(toDoState);


function ToDoList() {
  /*
    useState와 비슷함. 값, 값을 수정하는 함수
    const toDos = useRecoilValue(toDoState)
    const selectorOutput = useRecoilValue(toDoSelector)

    ** useRecoilValue(toDoSelector)의 return값은 배열
    categorySelector를 수정하니 오류가 생겼다 이유는
    toDoSelector가 2차원 배열을 반환하지 않기 때문
    const [ toDo, doing, done ] = useRecoilValue(toDoSelector)
  */
  const toDos = useRecoilValue(toDoSelector)
  const [ category, setcategory ] = useRecoilState(categoryState)
  const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
    // value와 category state atom을 연결
    // console.log(event.currentTarget.value)
    const {
      currentTarget : { value }
    } = event
    // setCategory를 호출할때 인자로 타입인 string만 넘기기때문에 오류발생
    // option의 value는 그냥 string으로 보기 떄문
    // categories타입과 같다는것을 인지하지못함.
    setcategory(value as any)
  }
  // console.log(toDo, doing, done)
  console.log(toDos)
  return (
      <div>
        <h1>To Dos</h1>
        <hr />
        <form>
          <select value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
          </select>
        </form>
        <CreateToDo />
        <ul>
          {toDos.map(toDo => <ToDo key={toDo.id} {...toDo} />)}
        </ul>

      </div>
    )
}

export default ToDoList