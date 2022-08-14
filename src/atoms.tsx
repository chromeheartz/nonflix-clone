import { atom, selector } from "recoil";

// toDo가 어떻게 생겼는지 디자인
export interface ITodo {
  id : number;
  text : string;
}

interface IToDoState {
  /*

    이 state는 
    우리의 key (to_do, doing, done)은 단지 key이고, 그것은 string니자<div className=""></div>
    (string으로써의 property)
    그리고 string array 로 이루어져있다 고 말한것

    [key : string] : string[]
  */

  // iToDoState는 여러개의 board와 그 안의 toDo array 들이라고 말함
  [key : string] : ITodo[]
}

export const toDostate = atom<IToDoState>({
  key : "toDo",
  default : {
    "To Do": [],
    Doing: [],
    Done: []
  },
})

/*
  기존에는 구조가
  ["a", "b"] 이런식으로 draggableId인 동시에 list 안의
  item이기도 했으니
  ["b", "a"] 이렇게 바꾸는 것에 오류가 없었다.

  이제 input의 값을 받아서 추가하기위해 
  ITodo라는 Interface를 만들었기 떄문에
  이제는
  [{text : "hello", id:1}, {text:"hello", id:2}]
  이런식으로 바꾸어 줄것이다.

  이 요소들을 마우스로 옮길 때, 우리의 움직임에서 받을 수 있는 정보는
  그냥 움직이는 item의 id만 얻을것이다 예 ) 2
  (draggabledId가 2가 되는것)

  어디에 있는 card가 움직이는지 받아올 수 있으니, 그 id 정보를 이용해
  toDo의 내용을 받아야한다. 어딘가에 먼저 저장해두고 삭제한 뒤에 닷시
  추가해주어야한다
  

*/
