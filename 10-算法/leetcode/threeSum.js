var threeSum = function (nums) {
  if(!nums|| nums.length < 3) {
    return []
  }
  let res = []
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
   if(nums[i] > 0) break;
   if(i > 0 && nums[i] === nums[i - 1]) continue; // 去重

   let l = i + 1;
   let r = nums.length - 1
   
   while( l < r) {
     const sum = nums[i] + nums[l] + nums [r];
     if(sum === 0) {
      res.push([nums[i], nums[l], nums [r]])
      while(l < r && nums[l] === nums[l + 1]) l++;
      while(l < r && nums[r] === nums[r - 1]) r--;
      l++;
      r--;
     } else if(sum > 0) {
       r--;
     } else {
       l++;
     }
   }
  }

  console.log(res)
  return res
}

// threeSum([-1,0,1,2,-1,-4])
threeSum([-1,0,1,2,-1,-4,-2,-3,3,0,4])
// [-4, -3, -2, -1, -1, 0,  0,  1,  2,  3,  4]
// [[-4,0,4],[-4,1,3],[-3,-1,4],[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]]