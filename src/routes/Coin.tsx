import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding : 0 20px;
  max-width : 480px;
  margin : 0 auto;
`;

const Header = styled.header`
  height : 10vh;
  display : flex;
  align-items : center;
  justify-content : center;
`;


const Title = styled.h1`
  font-size : 48px;
  color : ${props => props.theme.pointColor};
`

const Loader = styled.div`
  font-size : 20px;
  display : block;
  text-align : center;
`



interface RouteParams {
  coinUrl : string;
}

interface RouteState {
  name : string;
}


function Coin() {
  const { coinUrl } = useParams<RouteParams>();
  const [ loading, setLoading ] = useState(true);
  const { state } = useLocation<RouteState>();
  console.log(state);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "loading ..."}</Title>
      </Header>
      {
        loading ? (
          <Loader>loading ...</Loader>
        ) : (
          null
        )
      }
    </Container>
  )
}

export default Coin;