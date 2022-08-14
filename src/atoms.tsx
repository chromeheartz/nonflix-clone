import { atom, selector } from "recoil";

// toDo가 어떻게 생겼는지 디자인
export interface ITodo {
  id : number;
  text : string;
}

export const toDostate = atom({
  key : "toDo",
  default : {
    "To Do": [],
    Doing: [],
    Done: []
  },
})

