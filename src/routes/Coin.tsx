import { useParams } from "react-router-dom";

interface RouteParams {
  coinUrl : string;
}

function Coin() {
  const { coinUrl } = useParams<RouteParams>();
  console.log(coinUrl)
  return (
    <h1>Coin : {coinUrl}</h1>
  )
}

export default Coin;