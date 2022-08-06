/*
  function Circle({ bgColor } : CircleProps) {
    return <Container />
  }
  이것이나
  function Circle(props : CircleProps) {
    return <Container bgColor={props.bgColor}/>
  }
  둘은 같다.

  **

  interface는 object shape(객체모양)을 TypeScript에게 설명해주는 개념

  bgColor의 타입은 CircleProps의 object이다. 라고 말해주는것.

  **

  interface CircleProps {
    bgColor : string
  }

  function Circle({ bgColor } : CircleProps) {
    return <Container bgColor={bgColor} />
  }

  현재 우리는 두번 props를 보낸다.
  App.js에서 bgColor를 Circle component에 보내고 bgColor를 받아
  Container를 보낸다.

  보다시피 계속 보내고있다. 하지만 문제가있는데
  TypeScript가 봤을때는 Container가 div여서 이 component는 어떤 props들을 받고있지 않다

  그래서 TypeScript에게 bgColor를 styled-component에게도 보내고 싶다고 말할것이다.
  또다른 interface를 만들어서 TypeScript에게 Container가 bgColor를 받을것이라고
  말해주면된다.

  interface ContainerProps {
    bgColor : string
  }

  const Container = styled.div<ContainerProps>`
    width : 100px;
    height : 100px;
    border : 1px solid red;
    background-color : ${props => props.bgColor}
  `;

  * 이렇게 하면 좋은점이 이제 Container가 받는 props를 TypeScript에게 잘 설명해주기때문.
  또 styled-component가 받는 props를 설명해주기도한다.

  *** default props / optional props
  
  현재는 bgColor가 required라서 App.tsx의 Circle컴포넌트에서
  bgColor를 없애주면 에러가 난다.
  만약 꼭 필요하지 않은 선택적으로 만들고싶으면 어떻게 해야할까.

  만약 border-color를 첫번째에만 주고싶다.
  그렇게 되면 interface에 borderColor : string이런식으로 주게될텐데
  그렇게 되면 App.tsx에서 missing되었다고 에러가 날것이다 그럴때에는
  borderColor?이렇게 ?를 붙혀주면
  기존 문법과 같이 null이나 undefined일때는 실행을 하지 않는 맥락으로 진행될것이다.
  결국 optional이 된다는것. ?쪽에 마우스를 올려보면 string이거나 undefined라고 나올것이다.


  interface ContainerProps {
    bgColor : string
    borderColor: string
  }

  interface CircleProps {
    bgColor : string
    borderColor?: string
  }

  function Circle({ bgColor } : CircleProps) {
    return <Container bgColor={bgColor} borderColor={borderColor}/>
  }

  현재 CircleProps에서는 optional상태이지만 
  styled-component쪽에서는 required로 들어가있게 된다.
  이럴 경우에는 초기값을 준다.
  borderColor는 사용자가 만든 borderColor값이며
  만약 undefined상태라면 "white"이렇게 줄수도있다.
  현재에서 맥락에 맞는것은 bgColor와 같이 주는것

  borderColor={borderColor ?? bgColor}

  ?? fallback . 만일을 대비한.

  * default value 를 arg에서도 설정가능.
  
  prop을 하나 더 만들어서 optional으로 사용.

  ** state

  typeScript는 똑똑해서 state의 기본값을 넣어줄때
  어떤 타입인지를 알고있다. 그 후 그 데이터타입을 계속 쓸것이라고 생각을한다
  하지만 아주 간혹가다 두가지 타입이 들어갈 수도 있는 경우에는 
  이런식으로 써주면 된다.

  const [value, setValue] = useState<number|string>(0);
  

  ** event

  예를들어 onChange라는 함수안에서 event를 설정할때를 들어보겠다.
  기본적으로 event 의 type은 any이다. 어떤것이든 될 수있다는뜻.
  어떤때에는 괜찮지만 가능한 우리는 any 타입을 없애려고 해야한다.
  타입스크립트에게 어떤타입인지 설명해주어야한다.

  event에 타입을 추가하는 것을 해보겠다
  ReactJs는 React가 있다
  event : React.을 해보면 많은 타입들이 있을텐데 이번경우에는 
  FormEvent이다. 많은 타입들이 있기때문에 공식문서를 읽어보던지 구글링을 해야한다.

  event : React.FormEvent 
  FormEvent안에서 우리는 element를 볼 수 있다.
  이 상황에서 우린 어떤종류의 Element가 onChange 이벤트를 발생시킬지 특정할 수 있다.
  이번 경우에는 HTMLInputElement가 될것이다.

  고로 현재 , 타입스크립트는 onChange 함수가 inputElement에 의해서 실행 될것을 아는것이다.
  const onChange = (event : React.FormEvent<HTMLInputElement>) => {...}
  * react typescript에서는 event.target보다 event.currentTarget을 쓴다.

*/


/*
  ********** typescript recap **********
*/