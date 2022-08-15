import React, { useRef } from "react"
import styled from "styled-components";
import { motion } from "framer-motion"

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

// styled components + motion
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255,255,255,1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover : { rotateZ : 90 },
  click : { borderRadius : "100px" },
}


function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return (
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

    </Wrapper>
  )
}

export default App;