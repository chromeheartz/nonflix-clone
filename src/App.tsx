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
  invisible : {
    x : 300,
    opacity : 0,
    sacle : 0,
  },
  visible : {
    x : 0,
    opacity : 1,
    scale : 1,
    transition : {
      duration : 1
    }
  },
  exits : {
    x : -300,
    opacity : 0,
    sacle : 0,
    rotateX : 100,
    transition : {
      duration : 1
    }
  }
}

function App() {
  const [visible, setvisible] = useState(1);
  const nextPlease = () => setvisible(prev => prev === 10 ? 10 : prev+1)
  return (
    // motion value
    // <Wrapper style={{background : gradient}}>
    <Wrapper>
      <AnimatePresence>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
          i === visible ? (
          <Box 
            variants={box}
            initial="invisible"
            animate="visible"
            exit="exits"
            key={i}
          >
            {i}</Box>
          ) : null
        ))}
      </AnimatePresence>
      <button onClick={nextPlease}>next</button>
    </Wrapper>
  )
}

export default App;