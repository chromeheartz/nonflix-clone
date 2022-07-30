
/*

  ********** style components recap **********

  기존엔 div를 만들어주고 style이나 className을 부여하는식이였다.
  이제는 styled component를 import해서 쓴다.

  styled. 를 찍고 우리가 사용할 html태그의 이름을 적어준다.
  그 후 백틱사이에 우리가 사용했던 css코드를 넣어준다.
  현재 우리는 component를 만들었고 거기에 style을 줬다.

  이제 스타일링 된 컴포넌트를 사용할 수 있는데 컴포넌트 함수 안에 스타일을
  써줄 필요가 없고 더불어 알아보기 쉬운 이름을 적을 수 있다.
  column1, colum2, box , circle 이런식으로

  그 다음은 component를 설정하는것이다.
  Box를 두번 사용할때에 props를 사용해서 인자로 받아서 box 컴포넌트에
  전달해주는 함수를 만들수있다.

  const Box = styled.div`
    background-color : ${props => props.bgColor};
    width : 100px;
    height : 100px;
  `

  <Box bgColor="teal" />
  <Box bgColor="tomato" />

  이런식으로 하면 코드를 반복할 필요가 없다는것이다.
  props의 힘으로 컴포넌트를 설정할 수 있게해줌.

  ** component extend

  extend란, 컴포넌트의 모든 요소를 유지하면서 새로운 코드를 추가하는것.
  복붙하는것이 아니라 새로운 component에 적용하는것

  const Circle = styled(Box)`
    border-radius : 10px;
  `

  이런식으로 Box의 것들을 가져오고 Circle에서 필요한것'만' 추가할 수 잇게.
  이제 Box와 Circle은 서로 공유하게된다.
  이것들을 extension이라고 한다.

  ** change html tag

  간혹 그 안의 코드는 가져와서 쓰고싶은데
  html을 바꾸고싶을 경우가있다.

  const Btn = styled.button`
    color : tomato;
  `

  <Btn />
  이런식으로 가져오면 html 태그는 button이 되지만.
  as 속성을 넣어주어 html 태그를 바꿀 수 있다.
  const Link = styled.a`...` 이런식으로 만들어주는대신
  <Btn as="a" href="/" />
  로 처리해줄 수 있다. 

  ** html attribute

  html attribute(속성)가 반복되는 component를 만들 때에는
  html태그 명 뒤에 attrs()을 쓰고 그 안에
  object를 하나 만들어서 모든 input에 적용될 attribute를 만들것이다.

  const Input = styled.input.attrs({ required : true, maxLength : 10 })`
    background-color : tomato;
    color : teal;
  `

  <Input htmlFor="..."/>
  <Input />
  <Input />
  <Input />

  ** animation

  animation은 평번한 css와 같다.
  animation을 받을 element를 만들고 넣어주면된다
  keyframes helper를 import해준 후에
  
  export const anim = keyframs` // export로 다른곳에서도 사용가능.
    from {}
    to {}
  `
  로 animation설정한 후에 사용할 element에
  animation : ${anim} 1s infinite; 로 css처럼 사용.


  ** pseudo selector

  pseudo selector는 styledcomponent "안에" 있는것을 select하는것을 도와준다.

  <Wrapper>
    <h1>hello</h1>
  </Wrapper>

  현재의 h1은 그냥 html tag이다 styled component가 아닌.
  css를 주고싶을때 h1을 따로 잡고 하는것이아닌
  const Wrapper = styled.div`
    background-color : red;
    h1 {
      color : black;
    }
  `

  이런식으로 component안에 element도 sass같은 형식으로
  잡아줄수있다. 
  물론 state selector 인
  &:hover등 도 가능.
  부모인 Wrapper로 인해서 style을 갖는것.

  ** styled component select

  styled component안에 있는 styled component도 select가 가능하다.

  const Emoji = styled.span`
    font-size : 36px;
`

  const Box = styled.div`
      width : 200px;
      height : 200px;
      ${Emoji} {
        font-size : 36px;
        &:hover {
          font-size :98px;
        }
      }
  `

  ** theme

    import { ThemeProvider } from 'styled-components';
    import App from './App';

    const darkTheme = {
      textColor : "whitesmoke",
      backgroundColor : "#111"
    }

    const lightTheme = {
      textColor : "#111",
      backgroundColor : "whitesmoke"
    }


    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>

    property를 가진 object만 가지고 있으면되고,
    그 뒤에 그 object를 ThemeProvider에 전달하는것이다.
    그럼 ThemeProvider안에 있는 모든 component들은 
    이 object에 접근할 수 잇게 된다.

    만약 내가 두개의 theme을 만들고 이 두개의 theme이
    동일한 property이름을 갖고 있다면 
    우리가 theme을 전환해줄 때, component를 따로 바꿔줄 필요가 없다.
    
    



*/



/*
  ------------------------------------------------------
  ** 컴포넌트를 확장 시키는 방법 + props로 넘겨서 각각 다른 속성을 주는것

  const Father = styled.div`
    display : flex;
  `

  const Box = styled.div`
    background-color : ${props => props.bgColor};
    width : 100px;
    height : 100px;
  `

  const Circle = styled(Box)`
    border-radius : 50px;
  `

  function App() {
    return (
      <Father>
        <Box bgColor="teal" />
        <Circle bgColor="whitesmoke" />
      </Father>
    )
  }

  ------------------------------------------------------

  ** 다수의 컴포넌트를 다룰때 유용한 것 + as
  컴포넌트의 태그를 바꾸고싶은데 스타일을 바꾸고싶지 않을때도 포함

  const Father = styled.div`
  display : flex;
`

const Btn = styled.button`
  background-color : tomato;
  color : white;
  border : 0;
  border-radius : 15px;
` 

const Input = styled.input.attrs({ required : true, minLength : 10 })`
  background-color : tomato;
`
function App() {
  return (
    <Father as="header">
      <Btn>Log in</Btn>
      <Btn as="span">span</Btn>
      <Btn as="a" href="/">a link</Btn>

      <Input />
      <Input />
      <Input />

      </Father>
      )
    }

  ------------------------------------------------------
  ** animation

  style component 자체를 타겟팅 할 수도있다.
  그리고 땀표시에는 마우스를 올려도 아무일도 일어나지 않는다
  Box안에 있어야한다는 조건을 충족시키지 못하기때문.

  import styled, { keyframes } from "styled-components"

  const Wrapper = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    width : 100vw;
    height : 100vh;
`

  const rotateAni = keyframes`
      0% {
        transform : rotate(0deg);
        border-radius : 0px;
      }
      50% {
        transform : rotate(360deg);
        border-radius : 100px;
      }
      100% {
        transform : rotate(0deg);
        border-radius : 0px;
      }
  `

  const Emoji = styled.span`
      font-size : 36px;
  `

  const Box = styled.div`
      width : 200px;
      height : 200px;
      background-color : whitesmoke;
      border : 1px solid black; 
      animation : ${rotateAni} 2s linear infinite;
      display : flex;
      align-items : center;
      justify-content : center;
      ${Emoji} {
        font-size : 36px;
        &:hover {
          font-size :98px;
        }
      }
  `

  function App() {
    return (
      <Wrapper>
        <Box>
          <Emoji>🤑</Emoji>
        </Box>
        <Emoji>💦</Emoji>
      </Wrapper>
    )
  }

  ${} = string interpolation

  ------------------------------------------------------


  export default App;

*/