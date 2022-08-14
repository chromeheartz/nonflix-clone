import { atom, selector } from "recoil";

interface IToDoState {
  /*

    이 state는 
    우리의 key (to_do, doing, done)은 단지 key이고, 그것은 string니자<div className=""></div>
    (string으로써의 property)
    그리고 string array 로 이루어져있다 고 말한것
  */
  [key : string] : string[]
}

export const toDostate = atom<IToDoState>({
  key : "toDo",
  default : {
    to_do : ["a", "b", "c", "d", "e", "f"],
    doing : [],
    done : [],
  },
})

