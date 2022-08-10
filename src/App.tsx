import React from "react";
import { useRecoilState } from "recoil";
import { hourSelector, minuteState } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState)
  // selector로 useRecoilValue를 쓴다면 결과값으로 array를 받게될것이다.
  // 첫번째 배열의 요소는 get property로부터 return한 값이다
  // 두번째 요소는 set property를 부르는 함수가 될것.
  const [hours, setHours] = useRecoilState(hourSelector);
  const onMinutesChange = (event:React.FormEvent<HTMLInputElement>) => {
    /*
      atoms에서 number로 설정해서 오류가남
      앞에 + 를 붙여주면 string을 number로 바꾸게 해준다.
    */
    setMinutes(+event.currentTarget.value)
  }
  const onHoursChange = (event:React.FormEvent<HTMLInputElement>) => {

    setHours(+event.currentTarget.value);
  }
  return (
    <div>
      <input value={minutes} onChange={onMinutesChange} type="number" placeholder="Minutes"/>
      <input value={hours} onChange={onHoursChange} type="number" placeholder="Hours"/>
    </div>
  );
}

export default App;