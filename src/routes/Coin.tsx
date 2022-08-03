import { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
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
  const [ loading, setLoading ] = useState(true);
  const { state } = useLocation<RouteState>();
  const [ info, setInfo ] = useState<InfoData>();
  const [ priceinfo, setPriceInfo ] = useState<PriceData>();
  const priceMatch = useRouteMatch(`/${coinUrl}/price`);
  const chartMatch = useRouteMatch(`/${coinUrl}/chart`);

  useEffect(() => {
    (async () => {
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
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinUrl}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinUrl}`)
      ).json()
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false)
    })();
  }, [coinUrl])
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
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
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceinfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceinfo?.max_supply}</span>
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
            <Route path={`/${coinUrl}/price`}>
              <Price />
            </Route>
            <Route path={`/${coinUrl}/chart`}>
              <Chart />
            </Route>
          </Switch>
        </>
        )
      }
    </Container>
  )
}

export default Coin;