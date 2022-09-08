// var towSum = function(nums, target){
//   let arr = []
//   nums.some((item, index)=>{
//     let subNums = [...nums]
//     subNums.splice(index, 1)
//     if(subNums.includes(target - item)) {
//       arr= [ index, subNums.indexOf(target - item)+1]
//      return true
//     }
//   })
//  return arr
// }

// console.log(towSum([3,3],6))


function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    let arr = nums.slice(i + 1, nums.length)
    let j = arr.indexOf(target - nums[i]) 
    if(j >= 0 ) {
      return [i,j+i+1]
    }
    
  }
}

console.log(twoSum([2,7,11,15],9))
