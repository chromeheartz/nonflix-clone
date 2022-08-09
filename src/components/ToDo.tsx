import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../todoAtoms";

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
    /*
      enum의 안에 들어있는 값들에 마우스를 올려보면
      number가 있는데 이것이 버튼의 네임으로 들어오게 되어서 에러가 생긴다.
      버튼의 name이 숫자여선 안된다. 그렇기 떄문에 빈 문자열을 붙여 string으로 바꿔준다.

      ToDos를 콘솔로 찍어보면 category에 숫자가 들어간것을 볼 수 있다.

      모두가 같은 enum, 같은 값을 참조하기만 하면,
      이름은 원하는 대로 지어도 된다.
      결국 "TO_DO","DOING","DONE"은 코드상에서 사실
      0, 1, 2 다.

      원한다면 타입을 바꿀 수 있겠지만 enum이 숫자라는 사실은 흥미롭다.
      enum은 개발자의 코딩을 도와주는 도구이다.
      enum에서
      "TO_DO" = "TO_DO" 이런식으로 적어줄 수도 있다
      그렇게 되면 실제 값이 들어가게 된다 (문자열로)
    */
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO + ""} onClick={onClick}>To Do</button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING + ""} onClick={onClick}>Doing</button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE + ""} onClick={onClick}>Done</button>
      )}
    </li>
  )
}

export default ToDo;