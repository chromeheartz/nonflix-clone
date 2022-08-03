/*

  const [ coins, setCoins ] = useState<ICoin[]>([]);
  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100))
      setLoading(false)
    })();
  }, [])


*/

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color : white;
  color : ${props => props.theme.bgColor};
  margin-bottom : 10px;
  border-radius : 15px;
  a {
    display : flex;
    align-items : center;
    transition : color 0.2s ease-in;
    padding : 20px;
  }
  &:hover {
    a {
      color : ${props => props.theme.pointColor}
    }
  }
`;

const Img = styled.img`
  width : 35px;
  height : 35px;
  margin-right : 10px;
`

const Title = styled.h1`
  font-size : 48px;
  color : ${props => props.theme.pointColor};
`

const Loader = styled.div`
  font-size : 20px;
  display : block;
  text-align : center;
`

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

function Coins() {
  /* const [ coins, setCoins ] = useState<CoinInterface[]>([]);
  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100))
      setLoading(false)
    })();
  }, []) */
  /*
    useQuery는 2개의 인자를 받음
    1. query의 고유식별자
    2. fetcher 함수

    useQuery가 return하는 것들중 isLoading이라고 불리는 bollean값을 return한다.
    data 자리에 Fetch가 끝난 데이터들을 넣어준다 (return값)

    * 기존에 detail을 들어갔다가 list로 다시 돌아오면
    로딩이 떳었다.
    useQuery를 썼을때에 로딩이 보이지 않는 이유는
    reat query가 데이터를 캐시에 저장해놓기 때문.
  */
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  return (
    <Container>
      <Header>
        <Title>Coins Title</Title>
      </Header>
      {
        isLoading ? ( 
          <Loader>loading ... </Loader>
        ) : (
          <CoinsList>
            {data?.slice(0,100).map(coin => (
            <Coin key={coin.id}>
              <Link to={{
                pathname : `/${coin.id}`,
                state : { name : coin.name },
              }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`} 
                />
                {coin.name} &rarr;
                </Link>
            </Coin>
            ))}
          </CoinsList>
        )
      }
    </Container>
  )
}

export default Coins;