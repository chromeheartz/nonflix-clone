/* 
  원소의 위치가 바뀌지않게 교체하는 방법

  첫번째 단계는 바꿀 배열 원소의 위치를 아는것.
  두번째는 배열을 두분으로 나눔 (index이전, index이후) slice를 사용
  세번째 final으로 spread를 써서 합쳐준다

  const food = ["pizza", "mango", "kimchi", "kimbab"]
  const target = 1;
  const front = ["pizza"]
  const back =["kimchi", "kimbab"]
  const finalPart = [...front, "감", ...back]
  
  food.slice(0, 3) 0부터 시작해서 3이전까지 자른다
  food.slice(target+1) 을 하게되면 
  target index 1에서 1을 더한곳부터 끝까지 자른다.

*/
/* 
  **** 인자를 넘기고 싶으니까 onClick함수를 호출하는 익명함수를 새로 선언하여
  인자로 새 category를 넘겨주었다

  이것이 인자가 있는 onClick event를 처리하는 방법
  const onClick = (newCategory : IToDo["category"])) => {
    console.log(newCategory)
  }

  {category !== "TO_DO" && (
    <button onClick={() => onClick("TO_DO")}>To Do</button>
  )}
  {category !== "DOING" && (
    <button onClick={() => onClick("DOING")}>Doing</button>
  )}
  {category !== "DONE" && (
    <button onClick={() => onClick("DONE")}>Done</button>
  )}

  또한 버튼에 name을 주고
  const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget : { name }
    } = event
  }
  이렇게하면 event를 통해서 버튼의 name을 받아올 수 있다.
*/

/*
  Recoil Selector

  selector의 공식문서에는 derived state를 나타낸다고 쓰여있다.
  
*/