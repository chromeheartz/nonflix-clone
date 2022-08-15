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

*/

/*

  

*/


/*

  

*/


/*

  

*/