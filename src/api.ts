// fetcher함수는 꼭 fetch promise를 Return 해주어야함.

export function fetchCoins() {
  // async await 대신 Promise 사용
  // const response = await fetch("https://api.coinpaprika.com/v1/coins");
  // const json = await response.json();
  // return json;
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) => 
    response.json()
  );
}