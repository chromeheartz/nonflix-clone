/*
  
  #8.1 ~ #8.4 Header

  * 계속 반복되는 애니메이션  
  logo부분에 initial값과 animate값으로 마우스가 오버되었을때
  채워주는색상을 0으로 만들었다. 하지만 계속해서 반복시켜주고싶다면
  하나의 값을 가지는 대신에 배열로 만들 수 있다.

  active : {
    fillOpacity : [0, 0.5, 0, 0.7, 0, 0.2, 1, 0],
    transition : {
      repeat : Infinity,
    }
  },

  이렇게 각 단계를 지정하면, motion이 모든 단계를 실행시켜줄것이다.
  또한 transition repeat을 통해 무한으로할건지 아니면 반복횟수를 5 수로도 넣어줄수있다.

  ** router

  간혹 Route path 가 / 인 메인페이지인 것을 제일 상단에 올려놓으면
  다른 서브로들어가게 될때 "/"가 먼저 매칭되면서 주소는 옮겨지지만
  안에 컴포넌트가 제대로 출력이 되지 않을때가 있다. 그럴때에는
  /만 있는 경로를 제일 하단에 넣어주면 된다.

  ** route match

  react router는 우리가 지금 찾고있는 route는 URL에 있을것이라고 말해주고있다.

  useRouteMatch는 우리에게 이 route안에 있는지 다른곳에 있는지를
  알려줄것이다.

  const homeMatch = useRouteMatch("/")
  const tvMatch = useRouteMatch("/tv")
  console.log(homeMatch, tvMatch)

  여기서도 결과값이 
  {path: '/', url: '/', isExact: false, params: {…}}
  {path: '/tv', url: '/tv', isExact: true, params: {…}}

  {path: '/', url: '/', isExact: true, params: {…}}
  null

  path: '/', 항상 이 경로를 가지고있다. 이것은 항상 true가 될것이다
  / 안에서 /tv안에 있는것이기때문
  현재 보면 home을 클릭해서 가게되면 homeMatch의 isExact는 true가 되고
  tvMatch가 null 이 될것이다. 

  여기서 실질적으로 하고싶은것은 단순히 tvMatch가 존재하는지 여부에 따라 원을 그린다.
  하지만 homeMatch는 항상 가지고있기 때문에 그 안의 isExact를 확인해야한다.

  Home {homeMatch?.isExact && <Circle />}
  Tv Shows{tvMatch && <Circle />}

  ** state 

  <Search onClick={() => setSearchOpen(prev => !prev)}>
  이런식으로 익명함수를 onClick안에 바로 넣어주어도된다.

  *** search animation

  search icon을 눌렀을때 input이 x축으로만 늘어나게 해볼것이다
  * x축 *
  searchOpen이 현해 열려있는가에 따라서 
  비율을 1로 조정 할것이다

  애니메이션을 구축하는데에는 2가지 방법이있다
  한가지는 이런식으로 컴포넌트에 넣어주는 방법이고

  <Input animate={{ scaleX : searchOpen ? 1 : 0 }} />
  하지만 이렇게 하면 input이 중앙에서부터 양쪽으로 커져나가기 때문에
  변형의 시작점을 바꿀것이다

  * 새로운 한가지는 애니메이션을 코드로부터 실행시키는것이다.
  예를들어 toggleSearch에서 실행시키고싶을수도있을것이다

  const toggleSearch = () => {
    if(searchOpen) {
      trigger the close animation
    } else {
      trigger the open animation
    }
    setSearchOpen(prev => !prev)
  }

  구현을 생각해본다면 이런식의 로직이 될것이다

  * motion에서 제공하는 useAnimation hook을 사용할것이다
  const inputAnimation = useAnimation();
  선언을 해준 뒤 우리는 inputAnimation이라는 변수를
  input에다가 넣을것이다

  이제 우리가 하고싶은건 
  animate={{ scaleX : searchOpen ? 1 : 0 }}이런식으로
  input의 속성에 animate속성을 바로 주는것이 아니라 
  애니메이션 속성이랑 커멘트를 코드로부터 만들어줄것이다

  if(searchOpen) {
    inputAnimation.start({
      scaleX : 0,
    })
  } else {
    inputAnimation.start({
      scaleX : 1,
    })
  }

  이런식으로 코드로부터 만들어주게 되면, 애니메이션들을 동시에 실행시키고 싶을때
  유용하게 사용이가능하다.
  예를들어 유저가 로그인하면 20개의 애니메이션을 실행시키려고할떄 같은
  component의 props를 이용하지않고 하는것이 좋다


  **** useViewportScroll 
  
  이것은 우리에게 모션값을 주는데 스크롤을 움직일때 제일 밑에서부터
  얼마나 멀리있는지를 알려준다.

  이것은 두가지 값을 줄것이다 그 중 하나는 Progress 이다
  x,y에 대한 스크롤 진행도를 0에서부터 1사이의 값으로 알 수 있다
  끝에서부터 얼마나 떨어져있는지 0퍼센트부터 100퍼센트 사이의 값으로 나타냄

  * 변수를 지정해서도 가능하다
  여기서의 중요한점은 component에게 variants라고 두가지를 이어주는것이다
  만약 1가지 애니메이션만 하려면 이런식보다는
  그냥 animate={{backgroundCOlor : scrollY > 80 ? "" : ""}}
  이런식으로 해주는것이 더 좋을수도있다.

  ** 하지만 코드로 애니메이션을 실행시키는것은 매우매우 중요하다.

*/



/*
  

*/


/*
  

*/


/*
  

*/