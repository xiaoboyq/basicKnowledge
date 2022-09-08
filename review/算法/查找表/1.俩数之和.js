/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
   let cache = new Map()

   for(let i = 0 ; i < nums.length; i++) {
     let dif = target - nums[i];

     if(cache.has(dif)) {
       return [cache.get(dif), i]
     }

     cache.set(nums[i], i)
   }

};