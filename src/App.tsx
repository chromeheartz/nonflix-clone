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

// styled components + motion
const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display : flex;
  justify-content : center;
  align-items : center;
  font-size : 28px;
  position : absolute;
  top : 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

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

function App() {
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
  return (
    // motion value
    // <Wrapper style={{background : gradient}}>
    <Wrapper>
      {/* slider */}
      <AnimatePresence exitBeforeEnter custom={back}>
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
      <button onClick={prevPlease}>prev</button>
    </Wrapper>
  )
}

export default App;