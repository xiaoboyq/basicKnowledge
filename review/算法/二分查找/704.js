/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function(nums, target) {
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] === target) {
      return i
    } else if(nums[i] > target){
      return -1
    }
  }
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function(nums, target) {
  let len = nums.length;
 let left = 0, right = len - 1;
 while(left <= right) {
     let mid = left + ((right - left) >>1);
     if(nums[mid] > target) {
         right = mid - 1
     } else if(nums[mid] < target) {
         left = mid + 1
     } else {
         return mid
     }
 }
 return right
};