/*
  Overload 1 of 2, '(props: Props | Readonly): ReactApexChart', ... 에러뜨신분은
  bria 님이 언급해 주셧는데 조금더 첨언할께요
  series data [] 가 받아야 하는 건 number 인데 저희는 data?.map() 으로 읽어올때랑 아닐때를 구분해서 받아야 하는데 읽어오면 number 이지만 못읽어오면 undefind 가 되서 문제가 되는거예요.
  그래서 저 형식이 number 로 강제해주면 해결되는 문제입니다.

  강제해주는 방법은 bria 님이 언급하신 널 병합 연산자(??) 를 사용하는 방법도 있지만. 이해가 안가시죠?.. 저도 그랬어요 -0-;;;
  코드를 보고 이해가 안가면 찜찜하잖아요?
  as 를 이용하셔도 됩니다. 저 데이터는 number 배열이다! 라고강제 하는겁니다..

  data?.map((price) => price.close) as number[]

  이렇게요..
  같은거지만. 보고 바로 이해할수 있어서요.. 전 이렇게 해결했습니다..
*/

import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface IHistorical {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

interface ChartProps {
  coinUrl : string;
  // isDark : boolean;
}

function Chart({ coinUrl } : ChartProps){
  const isDark = useRecoilValue(isDarkAtom)

  const { isLoading, data} = useQuery<IHistorical[]>(
    ["ohlcv", coinUrl], 
    () => fetchCoinHistory(coinUrl),
    // { // option object
    //   refetchInterval : 5000,
    // }
  )
  return (
    <div>{isLoading ? "loading chart..." : <ApexChart type="line"  
    series={[
      {
        name : "price",
        data : data?.map((price) => parseFloat(price.close)) ?? [],
      }
    ]}
    options={{
      theme : {
        mode : isDark ? "dark" : "light"
      },
      chart : {
        height : 300,
        width : 500,
        toolbar : {
          show : false,
        },
        background : "transparent"
      },
      grid : {
        show : false,
      },
      xaxis : {
        labels : {
          show : false,
        },
        axisBorder : {
          show : false,
        },
        axisTicks : {
          show : false,
        },
        type : "datetime",
        categories : data?.map(date => date.time_close)
      },
      yaxis : {
        show : false,
      },
      stroke : {
        curve : "smooth",
        width : 5
      },
      fill : {
        type : "gradient",
        gradient : {
          gradientToColors : ["blue"],
          stops: [0, 70]
        },
      },
      tooltip : {
        y : {
          formatter : (value) => `$${value.toFixed(2)}`
        }
      }
      // colors : ["red"],
  }}/>}</div>
  )
}

export default Chart