// format은 넘어오지 않을수도있으니 ? 륿 붙여준다
export function makeImagePath(id:string, format? : string){
  // format이 없을때의 기본값 original
  return `https://image.tmdb.org/t/p/${format?format : "original"}/${id}`;
}