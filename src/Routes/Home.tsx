import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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

const Banner = styled.div<{bgPhoto:string}>`
  height : 100vh;
  display : flex;
  flex-direction : column;
  justify-content : center;
  padding : 60px;
  background-image : linear-gradient(rgba(0,0,0,0), rgba(0, 0, 0, 1)),url(${props => props.bgPhoto});
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

const Box = styled(motion.div)<{bgPhoto : string}>`
  background-image : url(${props => props.bgPhoto});
  background-size : cover;
  background-position : center center;
  height : 150px;
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
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    // typescript 오류를 피하기위해
    if(data) {
      if(leaving) return;
      toggleLeaving();
      // 이미 사용하고있으니 1개는 빼야한다.
      const totalMovies = data.results.length - 1;
      // 0부터 시작하기 때문에 1개를 빼주어야한다.
      const maxIndex = Math.floor(totalMovies / offset) -1;
      // index를 확인
      setIndex(prev => prev === maxIndex ? 0 : prev + 1)
    }
  }
  const toggleLeaving = () => setLeaving(prev => !prev)
  console.log(data, isLoading);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner onClick={increaseIndex} bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
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
                      key={movie.id}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{type : "tween"}}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
