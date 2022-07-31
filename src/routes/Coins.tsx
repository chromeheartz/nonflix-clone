import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

interface CoinInterface {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

function Coins() {
  const [ coins, setCoins ] = useState<CoinInterface[]>([]);
  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100))
      setLoading(false)
    })();
  }, [])
  console.log(coins)
  return (
    <Container>
      <Header>
        <Title>Coins Title</Title>
      </Header>
      {
        loading ? ( 
          <Loader>loading ... </Loader>
        ) : (
          <CoinsList>
            {coins.map(coin => (
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