/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permute = function(nums) {
   
  let res = [nums];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      let arr = [...nums]
      let  t =  arr[j];
      arr[j] = arr[i];
      arr[i] = t;
      console.log(arr)
      res.push(arr)
    }
  }
  console.log(res)
  return res

};

permute([1,2,3])