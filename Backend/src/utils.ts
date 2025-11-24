export function generateRandomHash(len :number){
  let data:String = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let res:String = '';

  for(let i=0 ; i<len ; i++){
    res = res + data.charAt(Math.floor(Math.random()*data.length));
  }

  return res;
}