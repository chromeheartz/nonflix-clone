import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background-color : black;
`

const Loader = styled.div`
  height : 20vh;
  display : flex;
  justify-content : center;
  align-items : center;
`

const Banner = styled.div<{bgphoto:string}>`
  height : 150vh;
  display : flex;
  flex-direction : column;
  justify-content : center;
  padding : 60px;
  background-image : linear-gradient(rgba(0,0,0,0), rgba(0, 0, 0, 1)),url(${props => props.bgphoto});
  background-size : cover;
`

const Title = styled.h2`
  font-size : 48px;
  margin-bottom : 10px;
`

const Overview = styled.p`
  font-size : 18px;
  width : 50%;
  display: -webkit-box;
  -webkit-line-clamp: 3;
          line-clamp: 3; 
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow : hidden;
`

const Slider = styled(motion.div)`
  position : relative;
  top : -150px;
`

const Row = styled(motion.div)`
  display : grid;
  grid-template-columns : repeat(6, 1fr);
  gap : 5px;
  position : absolute;
  width : 100%;
`

const Box = styled(motion.div)<{bgphoto : string}>`
  background-image : url(${props => props.bgphoto});
  background-size : cover;
  background-position : center center;
  height : 150px;
  cursor : pointer;
  &:first-child {
    transform-origin : center left;
  }
  &:last-child {
    transform-origin : center right;
  }
`

const Info = styled(motion.div)`
  padding : 10px;
  background-color : ${props => props.theme.black.lighter};
  opacity : 0;
  position : absolute;
  width : 100%;
  bottom : 0;
  h4 {
    text-align : center;
    font-size : 18px;
    overflow : hidden;
    text-overflow : ellipsis;
    white-space : nowrap;
  }
`

const Overlay = styled(motion.div)`
  position : fixed;
  top : 0;
  width : 100%;
  height : 100%;
  background-color : rgba(0, 0, 0, 0.5);
  opacity : 0;
`

const BigMovie = styled(motion.div)`
  position: absolute;
  width : 40vw;
  height : 80vh;
  left : 0;
  right : 0;
  margin : 0 auto;
  border-radius : 15px;
  overflow : hidden;
  background-color : ${props => props.theme.black.lighter};
`

const BigCover = styled.div`
  width : 100%;
  background-size : cover;
  background-position : center center;
  height : 300px;
`

const BigTitle = styled.h3`
  color : ${props => props.theme.white.lighter};
  padding : 10px;
  font-size : 36px;
  position : relative;
  top : -60px;
`

const BigOverview = styled.p`
  padding : 20px;
  position : relative;
  top : -60px;
  color : ${props => props.theme.white.lighter};
`

const rowVariants = {
  hidden : {
    x : window.outerWidth + 5,
  },
  visible : {
    x : 0
  },
  exit : {
    x : -window.outerWidth - 5,
  }
}

const boxVariants = {
  normal : {
    scale : 1, 
  },
  hover : {
    scale : 1.3,
    y : -30,
    transition : {
      delay : 0.5,
      duration : 0.3,
      type : "tween"
    }
  },
}

const infoVariants = {
  hover : {
    opacity : 1,
    transition : {
      delay : 0.5,
      duration : 0.3,
      type : "tween"
    }
  }
}

// ****
const offset = 6;

function Home(){
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{movieId : string}>("/movies/:movieId");
  // console.log(bigMovieMatch)
  const { scrollY } = useViewportScroll();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    // typescript ????????? ???????????????
    if(data) {
      if(leaving) return;
      toggleLeaving();
      // ?????? ????????????????????? 1?????? ????????????.
      const totalMovies = data.results.length - 1;
      // 0?????? ???????????? ????????? 1?????? ??????????????????.
      const maxIndex = Math.floor(totalMovies / offset) -1;
      // index??? ??????
      setIndex(prev => prev === maxIndex ? 0 : prev + 1)
    }
  }
  const toggleLeaving = () => setLeaving(prev => !prev)
  const onBoxClicked = (movieId:number) => {
    history.push(`/movies/${movieId}`)
  }
  const onOverlayClick = () => history.goBack() // or push("/")
  // console.log(data, isLoading);
  const clickedMovie = bigMovieMatch?.params.movieId &&
    data?.results.find(movie => String(movie.id) === bigMovieMatch.params.movieId)
  console.log(clickedMovie)
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner onClick={increaseIndex} bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row variants={rowVariants} 
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{type : "tween", duration : 1}}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset*index, offset*index + offset)
                  .map(movie => (
                    <Box 
                      layoutId={movie.id + ""}
                      key={movie.id}
                      onClick={() => onBoxClicked(movie.id)}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{type : "tween"}}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay 
                  onClick={onOverlayClick}
                  animate={{ opacity : 1 }}
                  exit={{ opacity : 0 }}
                />
                <BigMovie 
                  layoutId={bigMovieMatch.params.movieId}
                  style={{
                    top : scrollY.get() + 100
                  }}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{ backgroundImage : `linear-gradient(to top, black, transparent), URL(${makeImagePath(clickedMovie.backdrop_path, "w500")})` }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
