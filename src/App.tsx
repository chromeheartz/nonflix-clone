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
  const [ clicked, setClicked ] = useState(false);
  const toggle = () => setClicked(prev => !prev)
  return (
    // motion value
    // <Wrapper style={{background : gradient}}>
    <Wrapper onClick={toggle}>
      <Grid>
        <Box layoutId="hello" />
        <Box />
        <Box />
        <Box />
      </Grid>
      <AnimatePresence>
        {clicked ? (
        <Overlay 
          initial={{ backgroundColor : "rgba(0,0,0,0)" }}
          animate={{ backgroundColor : "rgba(0,0,0,0.5)" }}
          exit={{ backgroundColor : "rgba(0,0,0,0)" }}
        >
          <Box 
            style={{width : 400, height : 200}}
            layoutId="hello"
          />
        </Overlay> 
        ) : null}
      </AnimatePresence>
    </Wrapper>
  )
}

export default App;