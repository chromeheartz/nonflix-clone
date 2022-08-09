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
  output은 3개의 배열을 가진 배열이 되었다.
  const [ toDo, doing, done ] = useRecoilValue(toDoSelector)
  
  {toDos.map((toDo) => <ToDo text={toDo.text} category={toDo.category} id={toDo.id}/>)} 

  이렇게 써도 작동하는 이뉴는 toDos배열의 toDo원소 하나하나가
  toDo컴포넌트에 필요한 props와 같은 모양이기 때문. 
  
  <h2>To Do</h2>
  <ul>
    {toDo.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
  </ul>
  <hr />
  <h2>doing</h2>
  <ul>
    {doing.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
  </ul>
  <hr />
  <h2>done</h2>
  <ul>
    {done.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
  </ul>
*/

/*
  Recoil Selector

  selector의 공식문서에는 derived state를 나타낸다고 쓰여있다.
  derived state는 state를 입력받아서 그것을 변형해
  반환하는 순수함수를 거쳐 반환된 값.

  selector를 사용하면 atom의 output을 변형시킬수있다
  다른 state를 만들수있다. 내가 원하는대로 변형가능

  selector함수에는 key가 필요하다.
  또한 get function도 필요하다.
  get function은 인자로 객체를 받는데 그 객체에는 
  get function이 들어가있다.
  여기서 return하는 값이 selector 의 값이 될것이다

  * 요점은
  atom을 가져다가 output을 변형할 수 있다는 점.
  get function이 있어야 atom을 받을 수 있다

  get은 options이라는 인자를 받으면서 호출이 되는데
  options은 객체고 그 안에 get function이 들어있는것이다
  
  * 우리는 현재 state자체가 변하는것이 아닌
  output을 변형하는것 뿐이고 이것이 selector의 요점중 하나이다

  ** 
  const [ toDo, doing, done ] = useRecoilValue(toDoSelector)
  이 컴포넌트는 데이터를 render하기만한다.
  selector가 있으면 데이터에 좀 더 체계화된 방식으로 접근이 가능하다
  한곳에 데이터를 몰아놓고 컴포넌트안에서 그것을 수정하는것 대신
  atom에 데이터를 모아두고, selector로 데이터를 변형 할 수 있다
  어느 state에건 접근 할 수 있는 utility function 이 있다는것은 좋은것이다

*/