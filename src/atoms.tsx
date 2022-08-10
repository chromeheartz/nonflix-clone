import { atom, selector } from "recoil";

export const minuteState = atom({
  key : "minutes",
  default : 0,
})

// 이 selector는 number만을 return
export const hourSelector = selector<number>({
  key : "hours",
  // selector안에서 atom에 접근하려면 get함수를 사용
  get : ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  // atom을 수정하는것을 도와주는 set
  set : ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    // set 함수는 2개의 인자를 받음. 수정하고싶은 recoil atom, 새로운값
    set(minuteState, minutes)
  }
})
