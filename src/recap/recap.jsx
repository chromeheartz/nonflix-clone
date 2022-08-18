/*
  #7.1

  framer motion을 이용해서 animate를 하기를 원하면
  div를 막 쓸수 없다 div를 animate시킬 수 없기 때문

  motion패키지를 이용해야한다
  <motion.div></motion.div>
  <motion.header></motion.header>

  이런식으로 평범한 HTML이랑 똑같은 데 앞에 motion을 붙여야한다.

  create-react-app 이 Ver 4라면 오류가 날것
  에러를 해결하기 위해 
  Create-react-app 을 조금 수정해야한다.
  Ver5부터는 일어나지않음

  ** CRACO
  craco는 create-react-app 의 설정사항을 override할 수 잇게 해준다
  craco를 설치하고 한 파일을 만들어서
  우리가 override할 설정 내용을 포함할것이다.

  craco-config.js에 설정을 넣어주고
  package.json 에서 start,build,test를
  'react-scripts' 라는 단어를 craco로 바꾸어주어야한다.

*/

/*

  #7.2 basic animation
  
  styled component랑 motion을 합치려면
  styled(motion."HTMLTag") 이런식으로 써주면 된다

  그 component에 prop으로 속성을던질 수 있음.
  예 )
    animate={{borderRadius : "100px"}}
    transition={{duration : 3, delay : 1}}

  initial은 내가 원하는상태, element의 초기상태

  * 애니메이션을 걸었는데 살짝 바운스(튕기는)느낌이 있는것은
  모든 애니메이션에는 spring이라는게 기본적으로 달려있기 때문

  transition의 타입을 tween으로 해주면 선형적으로 진행된다
  spring으로 하면 살짝 튕김

  spring타입중에는 stiffness가 있는데 이것은 물리현상을 약간 시뮬레이트한다
  stiff(뻣뻣)하게 만듬
  damping(반동력) 같은것도 사용가능. 0으로 설정하면 무기한으로 진동
  (운동에 저항이 없는것)

  * spring은 현실세계의 물리법칙을 시뮬레이트한다
  force(힘)이 있고 elasticity(탄력성), stiffness(경직됨)이 있는것
  
  문서를 보면 transition의 속성들도 볼수 있다

*/

/*

  #7.3 ~ 7.4 variants part

  현재 Box의 animation은 prop에 맞추어져있다
  
  만약 variants를 쓰면 컴포넌트가 더 깔끔해질것이다
  variants는 기본적으로 애니메이션의 stage같은것이다
  variatns는 두가지 stage를 가질것이다
  initial, finish

  transition은 finish 파트에서 넣는것이 가능하다
  variants에 오브젝트 이름을 넣어주고
  inistial state의 prop은 initial이니
  initial="start" 처럼 오브젝트 내의 property이름을 적어주면 된다
  animate에는 "end" 의 이름을 넣어주면된다

  const myVars = {
    start : { scale : 0 },
    end : { scale : 1, rotateZ : 360, transition : { type : "spring", delay : 1 } }
  }

  <Box 
    variants={myVars}
    initial="start"
    animate="end"
  />

  * 여기서 한것은 '설정'으로 분리된 오브젝트로 옮긴것이다
  오브젝트, 프로퍼티이름은 중요하지않고 전달만 잘해주면된다.

  * 7.4의 요점은 컴포넌트가 자식들을 갖고 있을 때를 보는것.
  기본값으로 어떤 설정도 없을 때 부모컴포넌트가 variants,initial,animate를
  가지고 있다면 기본동작으로 motion은 이것을 복사해서
  자식들에게 자동으로 붙여줄것이다.*자식들에게만

  ** 자식들에 대한 애니메이션을 만들때 제일 중요한것은
  시작점 끝점의 이름이 같아야한다 
  *** 이유는 부모가 자식에게 initial="start", animate="end"를 그대로
  전달해주기 때문에. 붙여넣을 필요가 없다는것

  이렇게하면 자식들의 설정을 다시 해줄수 있다는것을 아는데
  현재 예제에서는 박스가 1개씩 따로따로 올라오고있다. 그것을 위해서 설정을 다시할것

  * 공식문서의 Orchestration을 보면 그 중에 delay가 있다.
  다른것은 delayChildren(자식들에게 딜레이를 주는것)이 있다

  만약 원한다면 부모 variants내에서 모든 자식들에게 delay를 줄 수 있다.

  *** 하지만 가장좋은점은 staggerChildren이다.
  예를들어 delay를 다 다르게 주어야 할 때 stagger하는것
  staggerChildren에 0.5를 주면 자동적으로 motion은 0.5씩 증가시키면서
  자동적으로 넣어준다

  이것이 정말 motion이 좋은점중 하나이다.

  *******

  const boxVariants = {
    start : {
      opacity : 0,
      scale : 0.5,
    },
    end : {
      opacity : 1,
      scale : 1,
      transition : {
        type : "spring",
        duration : 0.5,
        bounce : 0.5,
        delayChildren : 0.5,
        staggerChildren : 0.2
      }
    }
  }

  const circleVariants = {
    start : {
      opacity : 0,
      y : 10,
    },
    end : {
      opacity : 1,
      y : 0,
    }
  }

*/

/*

  #7.5 ~ 7.6 Gestures part

  * while 

  while prop을 이용해서 이벤트를 listen 할것이다
  props자리에 while이라고 치면 많은 이벤트 들이 나오는데 예를들어
  whilehover={{ scale : 2 }}를 하면 hover되었을때 2배가 된다

  Variants를 활용할것이다 whileHover에 오브젝트를 넣는대신에
  Hover, Tap 에 관련된 두 Variants를 만들것이다

  * variants를 사용하는것은 아주 좋다
  왜냐면 문자열을 넣기만 하면되기 때문.
  예를들어 아주 큰 어플리케이션에서 컴포넌트는 어떤 state를 가지게 될 텐데
  어떤 condition(조건문)이 필요할 수 있다
  그럴때에는 그냥 {condition ? "hover" : "other"}
  이런식으로 그냥 문자열만 넣어주면 어딘가에 있는 애니메이션의 설정을
  편하게 가질 수 있는것이다.

  const boxVariants = {
    hover : { scale : 1.5, rotateZ : 90 },
    click : { scale : 1, borderRadius : "100px" },
  }

  *** dragging

  drag 라는 속성을 주는것만으로 드래그가 가능해진다.
  whileDrag라는 속성으로 드래그 하는동안 바꿔줄수도있다.

  * 예륻들어 백그라운드 색을 "blue"이렇게 주는것보다
  rgba처럼 숫자값으로 넣어주면 motion은 그 값들을 애니메이트 해줄것이다

  ** drag constraint

  constarint(제약)을 하기위해서 할 수 있는것은
  스크롤을 잠궈버리는것이다. 
  drag="x" 이런식으로 하면 x축으로만 이동이가능하다.
  마찬가지로 y축도 가능

  dragConstraints prop을 사용해줄것인데
  기본적으로 어떤 Box를 만들 수 있다 (제약, 드래깅이 허용될 수 있는 영역)
  dragConstraints={{ top : -50, bottom : 50, left : -50, right : 50}}
  만약 다 0으로 준다면 어떠한 힘에 의해 중간으로 돌아오게 될것이다

  biggerbox 안에 box를 넣고 
  overflow hideen을 주면 예제처럼 잡히게된다

  * motion을 써서 중앙박스가 바깥쪽 박스에 의해 제약이 되게 만드는 법
  큰박스와 작은 박스의 수를 계산해서 제약을 걸어버리면 됨.

  하지만 좀 더 편하게 하려면 'ref'를 사용하면 된다

  ref로 biggerBox를 잡아주고
  제약이 biggerBoxRef에 맞춰지도록 했다.
  레퍼런스를 만들고 작은 Box에 제약을 걸어주었는데
  biggerBox의 가장자리까지라고 설정한것이다.

  * shortCut
  box가 드래그를 한 다음에 중앙으로 돌아가게 하고싶다면
  2가지 방법이 있다

  1. dragSnapToOrigin 이라는 것을 prop으로 걸어주면
  벽에서 바운스 되는것이 아니라 원래위치로 돌아가게 된다

  2. dragElastic은 0과 1사이의 값이여야한다
  Elastic은 기본적으로 '당기는 힘' 같은게 있다는 의미이다
  기본값은 0.5 인데 0.5로 줘보면 포인터한테 가까이 다가오지않고
  조금 멀리서 따라오게된다.
  1로 하게되면 내가 데리고 가는만큼 따라올것이고 놓게되면
  다시 중앙으로 돌아올것이다.
  0를 하게되면 Elastic이 없다는 뜻이라서 안쪽에 머물게 될것이다
  

  *******

  const BiggerBox = styled(motion.div)`
    width : 400px;
    height : 400px;
    background-color: rgba(255,255,255,0.3);
    border-radius : 40px;
    display : flex;
    align-items : center;
    justify-content : center;
    overflow : hidden;
  `

  const biggerBoxRef = useRef<HTMLDivElement>(null);
  <BiggerBox ref={biggerBoxRef}>
    <Box 
        drag
        dragSnapToOrigin
        dragConstraints={biggerBoxRef}
        dragElastic={0.5}
        variants={boxVariants}
        whileHover="hover"
        whileTap="click"
        whileDrag="drag"
    />
  </BiggerBox>

*/

/*

  #7.7 ~ 7.9 MotionValues part

  MotionValue는 애니메이션 내의 수치를 트래칭할때 필요하다.
  const x = useMotionValue(0)
  이런식으로 useMotionValue의 값을 만들어주고
  Box에 style로 {{ x : x }} 나 {{ x }} 이런식으로 shotchut으로 한다

  이제 유저가 Box를 드래그 할때마다 이 x값은 업데이트될것이다
  x좌표에 따라서. useMotionValue의 x와 style의 x를 연결한것

  console으로 찍어보는데 처음에만 콘솔이 찍히고 그 후는 안나온다
  그 이유는 MotionValue가 특별하기 때문
  MotionValue가 업데이트 될때
  React Rendering Cycle(렌더링 사이클)을 발동시키지 않을것이다

  그 말은 MotionValue가 ReactJS State(상태)로 살지 않는다는것
  State가 아님.
  그래서 MotionValue가 바뀌어도 컴포넌트가 렌더링되지않는다.

  useEffect(() => {
    x.onChange(() => console.log(x.get()))
  }, [x])

  useEffect를 사용해서 x에 onChange 이벤트 리스너를 걸어주고
  x.get()으로 값을 가져온다

  <button onClick={() => x.set(200)}>Click me</button>
  이렇게 set으로 설정해줄수도있다.

  ** transformation

  현재 브라우저를 기준으로
  -800 => 2
  -400 => 1.5
  0 => 1
  400 => 0.5
  800 => 0

  이런식으로 어떻게 크기를 조정해볼수 있을까
  x값들을 가져와서 바꿀수있도록 할것이다

  useTransform 훅을 사용할것이다
  일단 값을 하나 받는데, 이건 그 값의 어떤 제한값과 원하는 출력갑을 받을것이다
  첫번째로 값을 넣어준다. 현재는 x인데
  이 x는 우리가 드래그 할때마다 새로 설정되는 값이라는것을 알고있다

  그 후에 두번째로 Array(배열)을 넣을것이다
  그리고 난 세개의 값들을 원한다는것을 알릴것이다

  세번째 인자는 바로 output(출력값)이다

  const scaleValue = useTransform(x,[-400, 0, 400], [2, 1, 0.1]);
  react에서는 이런코드를 interpolation이라고 부른다
  한 값을 받아와서, 검토하길 원하는 입력값, 얻길 원하는 출력값들을 놓음
  논리적으로 생각하면 입력값, 출력값들은 갯수가 같아야한다.


  useEffect안에
  scaleValue.onChange(() => console.log(scaleValue.get())); 로 확인해보면됨

  추후에 style에 scale : scaleValue 로 이어주면
  잘 작동되는것을 볼 수 있다.

  * 새로운 코드들이나 useTransform을 잡아주는것,
  useEffect안에서 onChange 이벤트로 인해서 scaleValue를 찍어보는것
  등 새로운것들이좀 많아서 공부가 좀 필요할것같다.


  *********

  const x = useMotionValue(0);
  const scaleValue = useTransform(x,[-400, 0, 400], [2, 1, 0.1]);
  useEffect(() => {
    // x.onChange(() => console.log(x.get()))
    scaleValue.onChange(() => console.log(scaleValue.get()));
  }, [x])

  <Box 
    style={{x : x, scale : scaleValue}}
    drag="x"
    dragSnapToOrigin
  />

  ** 7.9 

  Wrapper의 배경색을 바꾸어줄것인데 알다시피
  motion에서 애니메이트를 하고싶을때 styled.div를 애니메이트 시킬수 없으니
  motion으로 한번 감싸준다.

  Gradient로 rotate를 했던것처럼 배경색을 설정해주고
  Wrapper에 style로 보내준다.

  ****** scroll listen

  useViewportScroll은 스크롤의 MotionValue를 넘겨줄것이다
  이것은 두가지를 넘겨줄것이다.

  - scrollX, scrollY
  - scrollXProgress, scrollYProgress

  우리는 vertical만 할것이여서 scrollY에 집중할것이다.
  scrollY는 픽셀단위인 수직 스크롤이 될것이고,
  scrollYProgress는 0과 1사이 값이다

  const { scrollY, scrollYProgress } = useViewportScroll();
  useEffect(() => {
    scrollY.onChange(() => {console.log(scrollY.get(), scrollYProgress.get())})
  }, [scrollY, scrollYProgress]

  이런식으로 Wrapper의 height를 높여놓고 확인해보면 콘솔에 찍히는 값들의
  차이점이 보일것이다.
  
  ********

  MotionValue와 useTransform, useViewportScroll을 활용해서
  스크롤, x축에 대한 애니메이션을 걸어보았다.

  const x = useMotionValue(0);
  const rotateZ = useTransform(x,[-400, 400], [-360, 360]);
  const gradient = useTransform(x, [-400, 400], 
  [
    'linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))',
    'linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))'
  ]);
  const { scrollYProgress } = useViewportScroll();
  // 박스가 너무 작아서 한번 더 값을 transform시켜준다
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5])

  <Wrapper style={{background : gradient}}>
      <Box 
      style={{x, rotateZ, scale }}
      drag="x"
      dragSnapToOrigin
    />
  </Wrapper>

*/


/*

  #7.10 SVG Animation

  모든 svg는 path를 가지고 있고, path는 fill을 가지고 있다.
  path의 fill에 currentColor는 svg의 color를 가질것이라는뜻.

  svg path의 opacity나 stroke를 animation하려면
  그냥 Path가 아닌 motion.path를 써주어야한다.

  inital, animate, transition을 Prop으로 던지면서 쉽게 
  설정할수 있다.

  다음으로 할것은 pathLength라는것을 수정할것이다
  pathLEngth는 현재 우리 위치까지의 path의 길이를 나타낸다.

  fill속성으로 opacity를 바꾸는 느낌을 주었고 pathLength를 0 - 1 로
  잡아주는것만으로 그려지는 효과가 나게된다

  * 원한다면 variant안에 넣어줄 수 있다
  또한         
    stroke="white"
    strokeWidth="4"
  같은 style들도 Svg에 넣어줄 수 있다

  ******  특정 property의 animation duration을 단독으로 변경하는 방법
  현재는 stroke와 fill이 같이 하게 되는데
  한가지를 조금 기다리고 있게 하고싶다면.

  예) 먼저 path를 그리고 끝나면 fill을 할 수 있게
  transition 의 default 객체를 하나 넣어주고 default값을 설정해주고
  직접적으로 어떤 propery를 어떻게 얼마나 animate할 지 객체를 만들어 특정할 수 있다

  const Svg = styled.svg`
    width : 300px;
    height : 300px;
    path {
      stroke : white;
      stroke-width : 4;
    }
  `

  const svg = {
    from  : {
      fill : "rgba(255,255,255, 0)",
      pathLength : 0
    },
    to : {
      fill : "rgba(255, 255, 255, 1)",
      pathLength : 1,
    }
  }


*/


/*

    #7.11 AnimatePresence
  
    AnimatePresence는 컴포넌트인데
    React js App 에서 사라지는 컴포넌트를 animate한다

    버튼을 클릭했을때 state를 바꾸게 해주어
    Box가 보이고 안보이게 하는것은 쉽다.
    이제 하고싶은건 Box가 없어질때 Box를 animate하는것이다

    {showing ? <Box /> : null}
    하지만 이렇게 하면 showing이 False가 되는 순간 null으로 바뀌는것이
    실행되기 떄문에 animate를 위한 공간이없다(motion을 쓸때를 제외하면)

    AnimatePresence의 딱 한가지 규칙은
    * visible 상태여야 한다는것이다.
    그리고 AnimatePresence의 내부에는
    condition(조건문)이 있어야한다.

    AnimatePresence는 안쪽에 나타나거나 사라지는게 있다면
    그것을 animate할 수 있도록 체크해줄것이다
    
    현재 리액트 18에서는 지원하지 않아
    https://velog.io/@keumky1/2.-Framer-Motion-%EC%9D%91%EC%9A%A9-layout-AnimatePresence
    를 보면 이해가 될것이다 props로 던져줘야하는것이있음.

    * AnimatePresence를 사용하면 React 트리에서 컴포넌트가 제거될 때
    제거되는 컴포넌트에 애니메이션 효과를 줄 수 있다.
    React에는 다음과 같은 쑤명주기 메서드가 없기 때문에
    종료 애니메이션을 활성화 해야한다.

    exit 
    이 컴포넌트가 트리에서 제거될 때 애니메이션 할 대상

*/



/*

  * slider 예시 코드
  https://codesandbox.io/s/framer-motion-image-gallery-pqvx3?from-embed

  #7.12 ~ 7.13 slider part

  AnimatePresence만 이용해 슬라이더 만들기
  어떻게 한 Box씩 보여줄 수 있을까.
  visible 이라는 state를 먼저 만들것이다

  visible의 값과 i 의 값이 같은지 확인하고
  박스를 보여줄수 있도록 할것이다

  i === visible ? 라는 컨디션만 넣어서 바꾸는것이다

  또한 nextPlease라는 함수를 만들어 state값을 바꾸어줄것인데
  10 이 넘어가게되면 그대로 return시켜준다

  box variants를 하나 만들어서
  invisible, visible, exits를 설정해주면 간단하게
  슬라이드가 완성된다

  next를 구현한것과 똑같이 prev를 구현하면
  animation이 같기 때문에 오른쪽으로 와서 왼쪽으로 사라진다
  뒤로 돌아가는데도.
  뒤로 돌아갈때는 반대방향으로 돌아가게 바꿔볼것이다

  우리가 현재 한 방식은
  Box의 숫자가 visible이면 Box를 생성하고 아니면 null을 return했다
  1개의 Box와 9개의 null을 만든것
  이런방식이 필요하지 않은게
  Reactjs는 key를 보고 각 Box가 고유하다고 생각한다
  key를 바꾸면 react js는 이전 element가 사라지고
  새 element가 생겼다고 인식할것이다 이점을 유리하게 사용할것이다.

  우리는 현재 숫자로 이루어진 visible이란 state를 가지고있어서
  key 에 넣어줄것이다
  
  그렇게되면 element의 key를 바꿔주는것만으로
  element가 사라졌다고 생각한다
  element가 사라졌다고 생각하면 exit animation이 실행될것이다

  * react 가 이전 component를 삭제하고 새것을 보여주는데에는
  initial, animate, exit 세가지 애니메이션이 다 적용된다

  ******* CUSTOM

  custom은 variants에 데이터를 보낼 수 있게 해주는 property이다.
  예를들면 우리가 가고자 하는 방향에 따라서
  entry와 exit를 바꾸면 될것같다

  custom={} 안에 들어갈 값은 0이나 1이나 뭐든가능하다.
  custom을 쓰면 variants를 바꿀 수 있다
  variants는 원래 여러 object를 가진 Object이지만

  *******

  custom을 사용하고 싶다면 variant object를 return하는
  function으로 바꾸어주어야한다.

  일단 next,prevPlease 함수에 setBack이라는 state를
  만들어 false, true를 구분할 수 있도록 한다

  그리고 custom={back}을 넣어준다
  Motion 의 규칙에 따라 
  custom을 AnimatePresence안에도 넣어주어야한다.

  entry : (back : boolean) => ({
      x : 300,
      opacity : 0,
      sacle : 0,
  }),

  여기서 {
    x : 300,
    opacity : 0,
    sacle : 0,
  }
  이렇게 해주면 return하지 않기 때문이다 이 object를
  return하고 싶으면 괄호로 감싸야한다

  물론 {
    return {
      x : 300,
      opacity : 0,
      sacle : 0,
    }
  }

  이렇게도 가능하다.
    
  이제 isBack에 따라서 entry의 내용을 바꿀 수 있다

  **** 
  prev 를 누르면 back은 true가 되고,
  back이 true가 되면 variant의 custom은 true를 받을것이다.

  **** 

  exitBeforeEnter 라는 prop이 있다
  현재는 next를 누르면 1번 Box의 animate가 실행되는 동안
  2번 Box의 entry가 거의 동시에 실행된다는것이다
  animation이 거의 함께 시작함

  이것을 바꾸고 싶으면 exitBeforeEnter를 넣어주면된다
  이것은 exit를 실행시키고 exit가 끝나면 다음 element를 불러올수있게하는것

  ***********

  
  const box = {
    entry : (isBack : boolean) => ({
        x : isBack ? -300 : 300,
        opacity : 0,
        sacle : 0,
    }),
    center : {
      x : 0,
      opacity : 1,
      scale : 1,
      transition : {
        duration : 0.5
      }
    },
    exits : (isBack : boolean) => ({
      x : isBack ? 300 : -300,
        opacity : 0,
        sacle : 0,
        rotateX : 100,
        transition : {
          duration : 0.5
        }
    }),
  }

  * APP *

  const [visible, setvisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlease = () => {
    setBack(false);
    setvisible(prev => prev === 10 ? 10 : prev+1);
  }
  const prevPlease = () => {
    setBack(true);
    setvisible(prev => prev === 10 ? 10 : prev-1);
  }

*/


/*

  #7.14 you Need to Watch This

  state를 하나 만들어서 wrapper가 클릭될시에
  Box 자체에 style을
  justifyContent : clicked ? "center" : "flex-start"
  이런식으로 해주었다

  이제 새로운 Prop을 해볼것인데
  layout이라는 prop이다. 이 prop을 element에게 주면
  그 element의 layout이 바뀔 때 알아서 animate가 된다

  만약 css때문에 layout이 바뀌면 그냥 animation이 만들어지는것
  center부터 flex-start까지

  이제 어떤 element가 위치를 바꿀지 생각해보면
  Circle이다. 그래서 Cirle에 layout만 써주면된다

  Framer Motion은 무언가 외부의 힘에 의해 바뀐것을 감지한다.
  
  style이나 css는 state에 의해 바뀔 수 있는데 그 변화가
  element를 움직이게 할 수 있는것이다.
  이것도 좋지만 이것은 최고는 아니고 더 나은 것이 있다

  * shared layout animation

  box, circle을 두개를 만들어 하나는
  clicked가 false일 떄 나오게 할것이다
  <Box>{!clicked ? <Circle /> : null}</Box>
  2번째는 반대로
  <Box>{!clicked ? null : <Circle />}</Box>

  지금은 보여주거나 숨기는것이다. 2개의 서로 다른 컴포넌트들을.

  **** layout

    const [clicked, setClicked] = useState(false);
    const toggleClicked = () => setClicked(prev => !prev);

    <Box style={{
      justifyContent : clicked ? "center" :  "flex-start",
      alignItems : clicked ? "center" : "flex-start"
    }}>
    <Circle layout />

*/

/*




*/