import { atom } from "recoil";

export interface IToDo {
  text : string;
  // 선택지를 제한. 모든 string이 아닌 이 세가지중 하나만 받아야함
  category : "TO_DO" | "DOING" | "DONE";
  id : number;
}

export const toDoState = atom<IToDo[]>({
  key : "toDo",
  default : [],
})
