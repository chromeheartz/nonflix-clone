import { atom, selector } from "recoil";

// 그냥 복붙을 안하게해주는 단순한 문법이다.
// type categories = "TO_DO" | "DOING" | "DONE"

export enum Categories {
  "TO_DO",
  "DOING",
  "DONE"
}

export interface IToDo {
  text : string;
  // 선택지를 제한. 모든 string이 아닌 이 세가지중 하나만 받아야함
  category : Categories;
  id : number;
}

// 사용자가 현재 선택한 카테고리를 저장하는 state

export const categoryState = atom<Categories>({
  key : "category",
  default : Categories.TO_DO,
})

export const toDoState = atom<IToDo[]>({
  key : "toDo",
  default : [],
})

export const toDoSelector = selector({
  key : "toDoSelector",
  get : ( { get }) => {
    const toDos = get(toDoState)
    const category = get(categoryState);
    // 조건을 만족하는 원소들만 담아서 return할것이다.
    return toDos.filter((toDo) => toDo.category === category)
    // return [
    // 카테고리에 따라 하나의 배열을 반환
    //   toDos.filter(toDo => toDo.category === "TO_DO"),
    //   toDos.filter(toDo => toDo.category === "DOING"),
    //   toDos.filter(toDo => toDo.category === "DONE"),
    // ]
  }
})
