/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function(nums, target) {
  let res = 0;
  let first = nums.indexOf(target) 
  if(first === -1) {
      return 0
  } 
   res++;
   let i = first + 1
   while(i < nums.length) {
       if(nums[i] > target) {
           return res;
       } 
       res++
       i++;
   }
 
   return res
 };

 search([1], 1)