function removeElement(nums, val) {
  let len = nums.length;
  for(let i = 0; i <= len - 1; i++) {
    if(nums[len - i - 1] !== val) {
      let t =  nums[i]
      nums[i] =  nums[len - i - 1];
      nums[len - i - 1] = t;
    } 
  }
}

[ 2,3,4,3,5, 2]

