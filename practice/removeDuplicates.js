// /**
//  * @param {number[]} nums
//  * @return {number}
//  */
//  var removeDuplicates = function(nums) {
//  for (let i = 0; i < nums.length;) {
//    if(nums[i] === nums[i + 1]) {
//      nums.splice(i, 1)
//    } else {
//      i++
//    }

const { getServers } = require("dns");

  
//  }
// console.log(nums.length)
//  return nums.length

// };


// var removeElement = function(array, val) {
//   for (let i = 0; i < array.length;) {
//       if(array[i] === val) {
//         array.splice(i, 1)
//       } else {
//         i++
//       }
    
//   }

//   console.log(array.length)
//   return array.length
// };

// removeElement([0,0,1,1,1,2,2,3,3,4], 2)


// 最大子序和
// var maxSubArray = function(array) {
//   let max = array[0];
//   let sum = 0;
//   for (let i = 0; i < array.length; i++) {
//    sum += array[i]
//    max = Math.max(sum, max);
//    if(sum < 0 ) {
//      sum = 0
//    }
    
//   }

//   console.log(max)
//   return max
 
// };

// maxSubArray([5,4,-1,7,8])


// var plusOne = function(digits) {
//   let i = digits.length;
//   while(i>0) {
//     let t = digits[i-1] + 1;
//     digits[i-1] = t%10
//     if(t>=10) {
//       i--
//     } else {
//       break 
//     }
//   }

//   if(i===0) {
//     digits.unshift(1)
//   }
//   console.log(digits)
//   return digits
 
// };


// plusOne([9,9,9])


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
//  var threeSum = function(array) {
//    array = array.sort((a,b)=>a-b)
//    let res = []
//    let sumArr= []
//    let sumZero = 0;
//    for (let i = 0; i < array.length; i++) {
//     if(array[i] === array[i-1]) {
//       if(array[i] === 0) {
//         sumZero++
//         if(sumZero === 3) {
//           res.push([0,0,0])
//         }
//       }
     
//       continue
//     } else  if(array[i] === 0) {
//       sumZero++
//     }
//       for (let j = i + 1 ; j < array.length; j++) {
//         if(j>i+1&&array[j] === array[j-1]) {
//           continue
//         }
//           sumArr.push({
//             "ivalue": array[i],
//             "jvalue": array[j],
//             "i": i,
//             "j": j,
//             "sum": array[i] + array[j]
//           })
   
//       }
//    }


//    for (let index = 0; index < sumArr.length; index++) {
//     if(array.includes(-sumArr[index].sum)&&array.indexOf(-sumArr[index].sum)!==sumArr[index].j&&array.indexOf(-sumArr[index].sum)!==sumArr[index].i)   {
//      let flag = false;
//       res.forEach(item=>{
//         let itemArr = [...item]
//         if(itemArr.includes(sumArr[index].ivalue)) {
//           itemArr.splice(item.indexOf(sumArr[index].ivalue), 1);
//           if(itemArr.includes(sumArr[index].jvalue)) {
//             flag=true
//           }
//         }
//       })
//       !flag&&res.push([sumArr[index].ivalue,sumArr[index].jvalue,sumArr[index].sum? -sumArr[index].sum: sumArr[index].sum])
      
//     }   
//    }

//    console.log(res)
//    return res

// };

// threeSum( [-4,-2,1,-5,-4,-4,4,-2,0,4,0,-2,3,1,-5,0])



// var merge = function(nums1, m, nums2, n) {
//   nums1.splice(m, nums1.length - m)
//   nums1.push(...nums2.slice(0,n))
//   nums1.sort((a,b)=>a-b)
//   return nums1
// };

// merge([1,2,3,0,0,0], 3,[2,5,6],3)


/** 平衡二叉树
 * @param {number[]} nums
 * @return {TreeNode}
 */
//  var sortedArrayToBST = function(nums) {
//    let  root = new TreeNode(null)

//   function TreeNode(val) {
//     this.value = val;
//     this.left = this.right = null
//   }

//     if(!nums.length) return null;
//     if(nums.length> 1){ 
//       root.left = sortedArrayToBST(nums.slice(0, Math.floor(nums.length/2)))
//       root.right = sortedArrayToBST(nums.slice(Math.floor(nums.length/2) + 1, nums.length))
//     } 

//     root.value = nums[Math.floor(nums.length/2)]
//     console.log(root)
//     return root
// };


// sortedArrayToBST([-10,-3,0,5,9])



/**35. 搜索插入位置
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
//  var searchInsert = function(nums, target) {

//   for (let i = 0; i < nums.length; i++) {
//     if(nums[i]>=target) {
//       return i
//     }
     
//    }
   
//    return nums.length
//   }
   



// searchInsert([1,3,5,6,9,10,120,1231], 5)

/**存在重复元素
 * @param {number[]} nums
 * @return {boolean}
 */
//  var containsDuplicate = function(nums) {
//    let newNums = [...new Set(nums)]
//    if(nums.length === newNums.length) {
//      return false
//    } 
//    return true

// };

// containsDuplicate([1,1,1,3,3,4,3,2,4,2])


/**存在重复元素 II
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
 var containsNearbyDuplicate = function(nums, k) {
  let arr =[], newArr = []
  for (let i = 0; i < nums.length - 1; i++) {
     arr = nums.slice(i, i + k + 1)
    newArr= [...new Set(arr)]
   if(arr.length !== newArr.length) {
     return true
   } 
  }
  return false
};

containsNearbyDuplicate([1,0,1,1], 1)



// display: flat-row








