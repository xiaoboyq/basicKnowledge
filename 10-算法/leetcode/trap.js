/**
 * @param {number[]} height
 * @return {number}
 * 给定一个直方图(也称柱状图)，假设有人从上面源源不断地倒水，最后直方图能存多少水量?直方图的宽度为
 */
// 时间复杂度O(n2) 空间复杂度为o(1)
var trap = function(height) {
  if(height.length === 0) {
   return 0;
  }
 let res = 0;
 let arrlen = height.length
 for (let index = 1; index < arrlen; index++) {
   let maxl = height[index]
   let maxr = height[index]
   for (let i = index; i < arrlen; i++) {
     maxl = Math.max(maxl, height[i])
   }

   for (let j = index; j >= 0; j--) {
     maxr = Math.max(maxr, height[j])
   }

    res += Math.min(maxr, maxl) - height[index]
   
 }
 console.log(res)
 return res
};


// trap([])
//[0,1,0,2,1,0,1,3,2,1,2,1] //6


// 时间复杂度 o(n) 空间复杂度为o(n)
var trap2 = function(height) {
 if(height.length === 0) {
  return 0;
 }
let res = 0;
let arrlen = height.length

let maxlList = new Array(arrlen)
let maxrList =  new Array(arrlen)

maxlList[0] = height[0]
maxrList[arrlen - 1] = height[arrlen - 1];

for (let i = 1; i < arrlen; i++) {
 maxlList[i] =  Math.max(maxlList[i - 1], height[i])
}

for (let j = arrlen - 2; j >= 0; j--) {
 maxrList[j] =  Math.max(maxrList[j + 1], height[j])
}

for (let index = 1; index < arrlen - 1; index++) {
   res += Math.min(maxlList[index], maxrList[index]) - height[index]
  
}
console.log(res)
return res
};


// trap2([0,1,0,2,1,0,1,3,2,1,2,1])


// 时间复杂度 o(n) 空间复杂度为o(1)  双指针
var trap3 = function(height) {
 if(height.length === 0) {
  return 0;
 }
let res = 0;
let arrlen = height.length

let left = 0;
let right = arrlen - 1;

let l_max = height[0];
let r_max = height[arrlen - 1];

while(left < right) {
  l_max = Math.max(l_max, height[left])
  r_max = Math.max(r_max, height[right])

  if(l_max < r_max) {
    res += l_max - height[left]
    left++
  } else {
    res += r_max - height[right]
    right--
  }
}


console.log(res)
return res
};


trap3([0,1,0,2,1,0,1,3,2,1,2,1])