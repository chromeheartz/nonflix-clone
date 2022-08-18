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
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display : flex;
  justify-content : center;
  align-items : center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
 background-color : #00a5ff;
 width : 100px;
 height : 100px;
 border-radius : 50px;
 box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`


function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked(prev => !prev);

  return (
    // motion value
    // <Wrapper style={{background : gradient}}>
    <Wrapper onClick={toggleClicked}>
      <Box>{!clicked ? <Circle /> : null}</Box>
      <Box>{!clicked ? null : <Circle />}</Box>
    </Wrapper>
  )
}

export default App;