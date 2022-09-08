function twoNumbersSum(arr:number[], n:number):number[] {
  let len = arr.length;
  let start = 0;
  let end = len;
  let res = []
  while (start < end) {
     let sum = arr[start] + arr[end]
     if (sum < n) {
       end --
     } else if ( sum > n) {
       start++
     } else {
      res.push(arr[start]);
      res.push(arr[end]);
      break

     }
  }
  return res
}
