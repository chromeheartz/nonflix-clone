import React, { useEffect, useRef } from "react"
import styled from "styled-components";
import { motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion"

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background : linear-gradient(135deg, rgb(238,0,153), rgb(221,0,238));
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
  const rotateZ = useTransform(x,[-400, 400], [-360, 360]);
  const gradient = useTransform(x, [-400, 400], 
  [
    'linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))',
    'linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))'
  ]);
  const { scrollYProgress } = useViewportScroll();
  // 박스가 너무 작아서 한번 더 값을 transform시켜준다
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5])
  return (
    <Wrapper style={{background : gradient}}>
      {/* MotitonValues */}
      <Box 
        style={{x, rotateZ, scale }}
        drag="x"
        dragSnapToOrigin
      />
    </Wrapper>
  )
}

export default App;