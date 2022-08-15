import React, { useEffect, useRef } from "react"
import styled from "styled-components";
import { motion, useMotionValue, useTransform } from "framer-motion"

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// styled components + motion
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255,255,255,1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {

}


function App() {
  const x = useMotionValue(0);
  const scaleValue = useTransform(x,[-400, 0, 400], [2, 1, 0.1]);
  useEffect(() => {
    // x.onChange(() => console.log(x.get()))
    scaleValue.onChange(() => console.log(scaleValue.get()));
  }, [x])
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
      <Box 
        style={{x : x, scale : scaleValue}}
        drag="x"
        dragSnapToOrigin
      />

    </Wrapper>
  )
}

export default App;