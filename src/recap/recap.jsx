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
  
  #8.5 ~ 8.6 Home screen

  리액트 쿼리를 이용해 데이터를 가져오기 위해 우리가 해야할 첫번째는
  쿼리 클라이언트를 만드는것이다.

  provider와 함꼐 설정해주고 api key를 생성한다

  그리고 우리가 해야할 유일한것은 URL로 요청을 보내는것이다
  URL을 가져올 도구를 만들어볼것이다

  api.ts에 fetch함수를 만들었다
  `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`를 넣어주고
  fetch다음에 response(응답)을 받기위해 then을 써주고
  response.json()을 반환할것이다.

  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`
  ).then((response) => response.json());

  사용할 곳에서 useQuery를 이용한다. 기본적으로 여기에
  KEY를 제공해야하고 이것은 문자열이나 배열이 될 수 있다

  두번쨰 인자로는 fetch 함수를 넣는다.

  추가로 우리는 useQuery가 data를 받았는지 loading중인지를 알려주는것을 안다
  여기서 movies,nowPlaying은 그냥 식별자에 불과한것.
  const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovies);

  ** 현재 이미지의 전체 URL을 주는것이 아니라 
  사진ID의 한 종류를 줄 뿐이다.
  이미지에 접근하기 위해서
  image.tmbd.org/t/p 이후에 이미지의 너비를 정하고
  받고싶은 이미지의 id를 넣어주어야한다

  https://developers.themoviedb.org/3/getting-started/images
  참고 링크

  ******* fetcher

  fetcher는 데이터를 받아오고 JSON을 리턴하는 함수에 불과하다.
  그리고 useQuery Hook은 fetcher를 사용해서 
  data랑 Loading중인지에 대해 알려줌

  Typescript를 사용하기 위해 API응답의 타입을 지정해주어야한다.
  interface로 각 타입을 지정해주고
  Typescript에게 useQuery의 결과가 IGetMoviesResult타입이라고 알려줌

  title과 p는 우리가 받아올 객체에서 뽑아주면 된다.
  하지만 background는 Helper function이 필요할것같다.

  util.js에 이미지의 경로를 만들어주는 함수를 만들었다.
  이미지 id인 id를 받을거고 format이 제공된다면 format을 사용하고 없으면 원본을 사용할것이다

  Banner에 bgPhoto라는 것을 만들었는데 typescript가 혼란스러우니
  Banner에 string인 bgPhoto가 들어온다고 정해주었다.

  <Banner pgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
  여기서 문제가 있었는데 typescript에 따르면 data가 정의되지 않을수도있다고 한다
  API에서 안올수도있어서 fallback을 만들어준다 || "" 
  여기서 한것은 어떠한 이유에서 data가 존재하지않아 backdrop_path가 제공되지않으면
  그냥 빈 string을 보내라고 한것이다

  * background-image : linear-gradient(rgba(0,0,0,0.5), rgba(0, 0, 0, 0.5)),url(${props => props.bgPhoto});
  글자가 잘 보이지 않아 linear gradient로 dim처럼 만들어주었다
  퍼블리싱할때도 좋은 팁이 될듯.

*/


/*
  
  #8.7 ~ 8.8 slider

  slider 를 만들어볼것인데 grid를 사용하고
  row들을 absolute로 띄워준다.

  motion을 사용할 때에는 모든것을 한번에 render할 필요가 없다
  그러는 대신 key만 바꾸면 된다.

  AnimatePresence는 컴포넌트가 render되거나 destroy될 떄
  효과를 줄 수 있다.

  일단 Row를 <AnimatePresence>안에 넣어주고 index 시스템이 필요하다
  어딘가를 클릭하면 계속 다음페이지로 넘어가는 기능을 만들수있으니.

  const [index, setIndex] = useState(0)
  const increaseIndex = () => {
    setIndex(prev => prev + 1)
  }

  Banner를 클릭했을떄 움직이는지 예시로 보려고 state를 바꾸어주는것을
  만들고나서,
  rowVariants를 지정해서 움직이게 지정을 해보았는데
  그렇게 되면 bounce가 생겨서 transition prop을 수정해볼것이다.
  모션의 기본 동작방식인 spring을 뺴주고 tween으로 바꾸어줌

  또한 rowVariants의 x값이 현재는 지정된 값인데 
  사용자의 화면 x값을 가져와야한다.
  window.outerWidth로 잡아주었다

  슬라이드를 잡는데 새로운 Row의 시작부분과 원래있던 Row의 마지막 사이에
  gap이 들어가기를 원한다면, 계산을 조금 바꿔야한다.
  variants에 gap이 들어가는 값을 넣어주면된다

  계속 버튼을 눌러주면 큰 간격이 생긴다. 원래 있던 Row가 exit하는 도중에 
  한번 더 눌러서 다음 Row도 사라지려고해서 생기는 현상이다.

  이것을 해결하기 위해 leaving이라는 state를 만들어줌
  leaving이 true일때 return으로 실행이 안되게 막아주었는데
  그렇게 되면 한번 실행이 된 후에 true로 바뀌어서 더이상 실행이 되지않는다

  여기서는 AnimatePresence의 prop을 하나 이용해볼것이다
  이 prop은 onExitComplete라는것인데 여기에 
  함수를 넣으면 exit가 끝났을때 실행이 될것이다.

  toggleLeaving이라는 함수로 반대로 넣어줄것이다
  increaseIndex안에서 호출하게되면 leaving은 true가 되고
  exit가 끝났을떄 toggleLeaving을 호출하면 다시 false가 될것이다.

  * 지금의 세팅에서는 movie들이 오른쪽에서 들어온다
  이것은 state가 hidden인 상태에서 시작해서 그렇다.
  이 문제를 해결하기 위해 다른 prop initial이라는 것을 주고
  false를 줄것이다 이렇게 작성해주면 컴포넌트가 처음 mount될 때 오른쪽에서
  들어오지않는다

  ** 현재 18개가 들어간다고 가정하면 6개씩 3개의 슬라이드가 나와야하는데
  함수를 하나 만들어 배열을 6개씩 잘라서 반환해주는 기능을 만들어볼것이다

  그러려면 Offset 상수가 필요하다 offset의 값은 6이 될것이고,
  page (index) 변수가 필요한데 시작은 0에서 할것이다
  배열을 잘라주는 Slice함수를 사용해서 만들것

  **** slice(offset*page, offset*page + offset)
  이런식으로 해줄것이다.
  그러면 page가 증가할때마다 가져오는 값이 달라질것이다
  pagination같은 맥락

  일단은 타이틀에서 썼던 것은 빼주는것부터 해주어야하니
  data.results.slice(1)으로 시작할것이다
  현재는 index라는 변수에 값이 들어가있기 때문에 이것으로 사용

  {data?.results
    .slice(1)
    .slice(offset*index, offset*index + offset)
    .map(i => (
      <Box key={i}>{i}</Box>
  ))}

  그렇게되면 18개 이후에 1개가 나오고 한번 더 누르면 비어있는것이나온다
  이제 index를 관리하는 부분에서 index를 증가만 시키는 대신에
  영화가 총 몇개인지 페이지가 총 몇개인지 상한에 도달했으면 0으로만들어주고
  이런작업들을 할것이다

  const totalMovies = data.results.length;
  const maxIndex = totalMovies / offset;

  이부분을 보면 영화가 많아지면 소수가 생길수있다 예를들어
  maxIndex가 4.2가 되면 페이지 4개를 다 채우고영화가 조금 남는다는 의미
  그렇기 때문에 Math.ceil()을 해서 올림처리를 해줌
  Math.floor는 반대로 내려주는것

  Box에도 bgPhoto를 prop으로 보내주고, type설정을 해서 보면
  제대로 들어오는데 로딩이 좀 걸린다. 기존에 만들었던 함수에서
  format을 보내서 해결할 수 있엇다.

*/


/*

  
  #8.9 ~ 8.10 Box Animation

  현재 넷플릭스는 hover되었을때 이미지의 스케일이 커지고
  커서를 올렸을떄에 딜레이가 있다. 하지만
  그냥 transition delay로 주게되면 커서를 치웠을때도 딜레이가 생김

  그것을 해결하기 위해 variant를 만듬
  hover상태의 애니메이션에서만 한정해서 delay를 설정할 수 있다.

  transition tween으로 해주려면 box의 prop과 active 되었을때
  둘다 넣어주어야한다.

  여기서 제일 첫번쨰와 제일 마지막은 scale이 바뀔때에 포스터가 잘리는
  현상이 보인다.
  각 번호에 맞는 child에게 transform origin으로 커지는 속성을 바꿔줌

  Info 라는 Box에 자식요소를 하나 만들었는데
  motion은 부모요소의 variants를 그대로 가져올 수 있다
  자동적으로 자식에게도 상속됨.

  Info에 필요한 속성들만 따로 variant를 만들어서 사용

*/




/*

  #8.11 ~ 8.13 Movie modal

  Modal을 구현하려면 일단 URL을 바꾸어야한다
  URL을 바꾸면 그 변화를 감지하고 URL에 기반하여 애니메이션을 실행시킬수 있음

  일단 내가 어떤 영화를 클릭했는지 id를 알아야하니
  Box가 클릭되었을때의 함수를 하나 만든다
  이 함수는 movieid를 인자로 받을것이다
  
  그 후에 Box에 onClick을 넘겨줄것인데 argument를 넘겨야하니까
  익명함수로 보내줄것이다
  onClick={() => onBoxClicked(movie.id)}

  * url을 바꾸기 위해서는 history object에 접근해야한다
  useHistory를 사용하면 URL을 왔다갔다 할 수 있다.
  hook을 import하고 push로 보내준다

  박스 클릭을하면 url이 잘 바뀌고 있지만 우리가 만든 Router는
  이런 URL을 처리하지 못하기때문에 Home을 보고있는것이다.
  그래서 match를 이용할것이다

  ** match는 지금 그 URL에 있는지 아닌지를 판단하는 도구
  match를 만들기전에 path를 배열로 바꾸려고한다
  / 이 path

  그럼 라우터가 사용자가 "/"에 있을때도 Home을 render하고
  "/movies/:movieId"에 있을때에도 Home을 render하도록
  <Route path="/"> 를 <Route path={["/", "/movies/:movieId"]}>\
  이렇게 하면 두개의 path에서 같은 컴포넌트를 render하도록 할 수 있다

  const bigMovieMatch = useRouteMatch("/movies/:movieId");
  이것을 콘솔로 찍어보면 Home일때는 아무것도 나오지않고
  클릭을해서 바뀌게되면 정보가 객체로 들어온다

  이제 다른컴포넌트안에 AnimatePresence를 사용할것이다
  그 컴포넌트는 bigMovieMatch가 존재할때만 나오게 할것이다
  route가 URL에 위치하면 있을것이고 없으면 null이다.
  이것이 존재한다면 큰 모달이 나와야한다는 뜻

  * layoutId 
  layoutId는 두개의 다른 div를 연결하고 framer motion이 그 div 사이를
  애니메이션으로 연결할 수 있도록 하는 도구
  movie.id를 주었는데 이것은 number이다. layoutId는 string을 원하기 때문에 string으로 
  변환시켜줌

  Box에는 설정을 해주었는데 modal에도 같은 값을 넣어주려고한다.
  어떤 박스가 클릭 되었는지 알고싶으면 URL을 참고하면 된다.

  <motion.div layoutId={bigMovieMatch.params.movieId}
  이렇게 쓰면 typescript에서 movieId에 오류를 뱉어낼것인데
  useRouteMatch로 가서 params속의 movieId가 string이라는것을 알려주면된다


  붙어있는 두개의 컴포넌트를 렌더링하기위해 <> Fragment를 써주고
  Overlay 의 style을 정의해준다.
  이제 Overlay의 onClick 이벤트를 감지할것
  Overlay를 클릭하면 원래로 돌아갈수있도록
  onOverlayClick 이라는 함수를 만들어서 history를 사용할것이다 
  goBack 혹은 push('/')를 해주어도 된다

  현재 overlay가 정중앙이 아닌 살짝 위로 올라갔는데 그것은 
  motion.div에 top이 50으로 잡혀있어서 그렇다
  
  나는 card가 클릭 되었을 때 사용자가 밑으로 스크롤을 많이했어도 card가 가운데 나오게 하고싶다
  이것을 해결하려면 scroll Position에 대해 알아야한다

  사용자가 어디에 있든 스크롤된 화면에 맞게 가운데에 나오게 하고싶음
  그래서 framer-motion의 useViewportScroll을 사용해볼것이다


  *** useViewportScroll은 obejct를 하나 return해줌.
  거기엔 현재 scrollX, scrollY의 progress값 또는 스크롤 거리의 숫자값이 있다
  motion.div의 top값을 scrollY로 바꿔주면 내가 어디서 클릭을하던 화면 위에 딱 붙을것이다

  * scrollY에 마진을 좀 주려고 + 100을 하면 에러가 생긴다
  이 행동은 MotionValue에 number를 더하는것이기 때문
  MotionValue는 특별하기때문에 .get()를 넣어주면 실제 값을 가져올 수 있다

  style에서는 괜찮았지만 styled component로 옮겨서 넣어주게되면 scrollY.get()은 되지 않을것이다
  이럴때에는 animateValue가 필요하다

  이제 우리는 movieId를 가지고 정보를 찾아서 갖고있는 이미지를 보여줄것이다

  ** tip 
  이번 프로젝트에서는 now playing을 이용했지만 get details로 API요청을하게되면
  더 많은 정보들을 가져올 수 있다.

  **

  movieId를 이용해서 우리가 API에서 얻어온 data에서 그 영화를 찾을것이다.
  그러면 다른 컴포넌트가 이 URL로 API에서 정보를 얻어오는 동안 미리보기를 보여줄 수 있을것이다
  그래서 clickedMovie라는 상수를 만들것이다
  여기서는 bigMovieMatch가 존재하는지 확인해야 할것이다

  *** 이 부분 진짜 중요할듯함
  const clickedMovie = bigMovieMatch?.params.movieId &&
    data?.results.find(movie => movie.id === bigMovieMatch.params.movieId)

  이렇게 하면 오류가 뜰것이다 movie.id는 number고 다른것은 string이여서
  앞에 String(movie.id)를 해도 되고 + ""를 해도 되고 뒷부분에 +로 number로 바꾸어도된다
  
*/