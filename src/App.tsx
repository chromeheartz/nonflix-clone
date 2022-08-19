import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components";
import { 
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
  AnimatePresence
 } from "framer-motion"

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction : column;
  justify-content: center;
  align-items: center;
  background : linear-gradient(135deg, rgb(238,0,153), rgb(221,0,238));
`;

const Grid = styled.div`
 display : grid;
 grid-template-columns : repeat(3, 1fr);
 width : 50vw;
 gap : 10px ;
 div:first-child,
 div:last-child {
  grid-column : span 2;
 }
`

// styled components + motion
const Box = styled(motion.div)`
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display : flex;
  justify-content : center;
  align-items : center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
 width : 100%;
 height : 100%;
 position : absolute;
 display : flex;
 align-items : center;
 justify-content : center;
`

function App() {
  const [ id, setId ] = useState<null|string>(null);
  console.log(id)
  return (
    // motion value
    // <Wrapper style={{background : gradient}}>
    <Wrapper>
      {/* basic animation */}
      {/* <Box  
        initial={{ scale : 0}}
        animate={{ scale : 1, rotateZ : "360deg" }}
        transition={{type : "spring", delay : 1 }}
      /> */}

      {/* variants */}
      {/* <Box variants={boxVariants} initial="start" animate="end" >
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box> */}

      {/* while */}
      {/* <Box 
        variants={boxVariants}
        whileHover="hover"
        whileTap="click"
      /> */}

      {/* dragging */}
      {/* <BiggerBox ref={biggerBoxRef}>
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
      </BiggerBox> */}

      {/* MotitonValues */}
      {/* <Box 
        style={{x, rotateZ, scale }}
        drag="x"
        dragSnapToOrigin
      /> */}

      {/* SVG animation */}
      {/* <Svg 
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
      <motion.path
        variants={svg}
        initial="from"
        animate="to"
        transition={{
          default : {
            duration : 4,
          },
          fill : {
            duration : 2,
            delay : 2
          }
        }}
        d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
      ></motion.path>
      </Svg> */}

      {/* AnimatePresence */}
      {/* <button onClick={toggleShowing}>Click</button>
      <AnimatePresence>
        {
          showing ? (
            <Box
              variants={boxVariants}
              initial="initial"
              animate="visible"
              exit="leaving"
            />
          ) : null
        }
      </AnimatePresence> */}


	    {/* slider */}
      {/* <AnimatePresence exitBeforeEnter custom={back}>
          <Box 
            custom={back}
            variants={box}
            initial="entry"
            animate="center"
            exit="exits"
            key={visible}
          >
            {visible}</Box>
      </AnimatePresence>
      <button onClick={nextPlease}>next</button>
      <button onClick={prevPlease}>prev</button> */}


      {/* sharelayoutId 1 */}
      {/* <Wrapper onClick={toggleClicked}>
        <Box>{!clicked ? <Circle layoutId="circle" style={{ borderRadius : 50 }}/> : null}</Box>
        <Box>{clicked ? <Circle layoutId="circle" style={{ borderRadius : 0 }} /> : null}</Box>
      </Wrapper> */}



      {/* sharelayoutId 2 */}
      <Grid>
        {[1,2,3,4].map(number => (
           <Box 
            onClick={() => setId(number+"")}
            key={number}
            layoutId={number+""} 
          />
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
        <Overlay 
          onClick={() => setId(null)}
          initial={{ backgroundColor : "rgba(0,0,0,0)" }}
          animate={{ backgroundColor : "rgba(0,0,0,0.5)" }}
          exit={{ backgroundColor : "rgba(0,0,0,0)" }}
        >
          <Box 
            style={{width : 400, height : 200}}
            layoutId={id+""}
          />
        </Overlay> 
        ) : null}
      </AnimatePresence>
    </Wrapper>
  )
}

export default App;