/*
  const response = await fetch(`https://api.coinpaprika.com/v1/coins/${coinUrl}`);
  const json = await response.json();

  한줄로 바꾸는 코드도 있다.
  const response = await (
    await fetch(`https://api.coinpaprika.com/v1/coins/${coinUrl}`)
  ).json();

  이것이 캡슐화다
  response를 받고 그 response에서부터 json을 받는것.
  한줄의 solution이 두개의 변수를 받는것이다.
*/

/*
  첫번째: Coins.tsx의 fetchCoins 에는 뒤에 ()가 붙지 않습니다.
  두번째 : Coin.tsx 의 () => fetchfunction(argument) 는 
  함수 뒤에 ()가 있고 그안에 인자가 들어가지만 앞에서 
  () => 를 표현하여 주었으므로 일종의 함수 포장지 입니다.

  정리 : useQuery 의 두번째 인자로는 함수가 들어가야 하지 
  함수의 실행값이 들어가서는 안됩니다. 함수의 뒤에 ()를 붙이는것은 
  함수를 실행하겠다는 의미이고, ()를 붙이지 않는것은 함수의 실행권한을
  이벤트에게 넘기겠다는 말과 같습니다.

  영상에서는 함수 뒤에 인자를 넣어주어야 하는데 
  함수에 괄호를 열고 바로 인자를 집어넣으면 
  함수를 전달하는 모양이 아닌 함수를 실행하여 
  리턴된 값을 전달하게 되므로 기대하지 않은 
  파라미터를 넘기는것과 같습니다. 
  그렇기 때문에 () => 를 써서 함수안에 집어넣은 모양을 만들어 주는것입니다.
*/


import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display : grid;
  grid-template-columns : repeat(2, 1fr);
  margin : 25px 0px;
  gap : 10px;
`

const Tab = styled.span<{ isActive:boolean }>`
  text-align : center;
  text-transform : uppercase;
  font-size : 12px;
  font-weight : 400;
  background-color : rgba(0, 0, 0, 0.5);
  padding : 7px 0;
  border-radius : 10px;
  color : ${props => props.isActive ? props.theme.pointColor : props.theme.textColor};
  a {
    display : block;
  }
`


interface RouteParams {
  coinUrl : string;
}

interface RouteState {
  name : string;
}

//  typescript 코드베이스들을 보면
// interface앞에 I를 붙이는것이 관례처럼 사용된다.
// ex ) interface IInfoData 

// interface ITag {
//   id: string;
//   name: string;
//   coin_counter: number;
//   ico_counter: number;
// }  

interface InfoData {
  id : string;
  name : string;
  symbol : string;
  rank : number;
  is_new :  boolean;
  is_active :  boolean;
  type : string;
  // tags : ITag[];
  description : string;
  message : string;
  open_source :  boolean;
  started_at : string;
  development_status : string;
  hardware_wallet :  boolean;
  proof_type : string;
  org_structure : string;
  hash_algorithm : string;
  first_data_at : string;
  last_data_at : string;
}
interface PriceData {
  id : string;
  name : string;
  symbol : string;
  rank : number;
  circulating_supply : number;
  total_supply : number;
  max_supply : number;
  beta_value : number;
  first_data_at : string;
  last_updated : string;
  quotes : {
    USD : {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    }
  };
}


function Coin() {
  const { coinUrl } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch(`/${coinUrl}/price`);
  const chartMatch = useRouteMatch(`/${coinUrl}/chart`);

  const {isLoading : infoLoading, data: infodata} = useQuery<InfoData>(
    ["info", coinUrl],
    () => fetchCoinInfo(coinUrl)
  )
  const {isLoading : ticekrsLoading, data: tickersdata} = useQuery<PriceData>(
    ["tickers", coinUrl],
    () => fetchCoinTickers(coinUrl)
  )

  // const [ loading, setLoading ] = useState(true);
  // const [ info, setInfo ] = useState<InfoData>();
  // const [ priceinfo, setPriceInfo ] = useState<PriceData>();
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinUrl}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinUrl}`)
  //     ).json()
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false)
  //   })();
  // }, [coinUrl])
  const loading = infoLoading || ticekrsLoading
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infodata?.name}
        </Title>
     </Header>

      {
        loading ? (
          <Loader>loading ...</Loader>
        ) : (
          <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infodata?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infodata?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infodata?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infodata?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersdata?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersdata?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinUrl}/price`}>
                Price
              </Link>              
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinUrl}/chart`}>
                Chart
              </Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinUrl}/chart`}>
              <Chart coinUrl={coinUrl} />
            </Route>
            <Route path={`/${coinUrl}/price`}>
              <Price />
            </Route> 
          </Switch>
        </>
        )
      }
    </Container>
  )
}

export default Coin;