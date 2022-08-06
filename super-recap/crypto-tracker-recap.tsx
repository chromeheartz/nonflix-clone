/*
  point
  
  1.themeprovider

  ThemeProvider를 index에서 App으로 옮긴 이유는
  state를 사용하려고하기때문이다.

  2. theme state

  toggleDark 라는 함수를 만들어서 Coins 컴포넌트에서 사용하려면
  2단계나 밑으로내려주면서 같은 일을 반복해야함.

  * global state

  global state는 어플리케이션이 특정 value에 접근해야할 때 쓰는것
  component가 어디에 있던지, 누가 접근하고자 하는지에 상관없이.
  어플리케이션 전체에서 공유되는 state.

  

*/