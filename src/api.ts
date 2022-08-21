const API_KEY = "3b524a34352c4dd7f87f29a4dba72975";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id : number;
  backdrop_path : string;
  poster_path : string;
  title : string;
  overview : string;
}

export interface IGetMoviesResult {
  dates : {
    maximum : string;
    minimum : string;
  },
  page : number,
  // movie라고 부를 타입의 배열이 될것. IMovie인터페이스로 만듬
  results : IMovie[],
  total_pages : number;
  total_results : number;
}

export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`
  ).then((response) => response.json());
}