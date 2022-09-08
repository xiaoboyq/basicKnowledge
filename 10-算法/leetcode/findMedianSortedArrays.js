/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 var findMedianSortedArrays = function(nums1, nums2) {
   let arr = nums1.concat(nums2)
   let res = 0;
   arr.sort((a,b)=>a-b)
   let len = arr.length
   console.log(arr)
   if(len % 2 === 0) {
     res = (arr[len/2 - 1] + arr[len/2])/2
   } else {
    res = arr[Math.ceil(len/2) - 1]
   }
   
   console.log(res.toFixed(5))
   return res.toFixed(5)
  };

findMedianSortedArrays([1,3], [2])