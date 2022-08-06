// fetcher함수는 꼭 fetch promise를 Return 해주어야함.

const BASE_URL = `https://api.coinpaprika.com`;

export function fetchCoins() {
  // async await 대신 Promise 사용
  // const response = await fetch("https://api.coinpaprika.com/v1/coins");
  // const json = await response.json();
  // return json;
  return fetch(`${BASE_URL}/v1/coins`).then((response) => 
    response.json()
  );
}

export function fetchCoinInfo(coinUrl : string) {
  return fetch(`${BASE_URL}/v1/coins/${coinUrl}`).then((response) => 
    response.json()
  );
}

export function fetchCoinTickers(coinUrl : string) {
  return fetch(`${BASE_URL}/v1/tickers/${coinUrl}`).then((response) => 
    response.json()
  );
}

export function fetchCoinHistory(coinUrl : string) {
  // mill > seconds
  // const endDate = Math.floor(Date.now() / 1000);
  // 현재는 하루전 *7하면 일주일전
  // const startDate = endDate - 60*60*23 * 7 * 1;
  
  return fetch(` https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinUrl}`).then((response) => 
    response.json()
  );
}