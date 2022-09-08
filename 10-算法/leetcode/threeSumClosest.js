/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 *  进行排序先
 */
function threeSumClosest(nums, target) {
  nums.sort((a,b)=> a-b) 
  let closest = nums[0] + nums[1] + nums[2]
  let length = nums.length;
  for(let i = 0; i < length; i ++) {
    let leftNum = i + 1, rightNum = length - 1;
    while(leftNum < rightNum) {
      let threeSum = nums[i] + nums[leftNum] + nums[rightNum];
      if(Math.abs(closest - target) > Math.abs(threeSum - target)) {
        closest = threeSum;
      } else if(threeSum > target){
        rightNum--;
      } else if(threeSum < target) {
        leftNum++
      } else if(threeSum === target) {
        return target;
      } 
    }
  }
}

//nums = [-1,2,1,-4,5,6,9,0], target = 1