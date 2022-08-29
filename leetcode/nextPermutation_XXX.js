/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  let len = nums.length;
  let i = len;
  if (len === 1) {
    return nums
  }

  let flag = false;
  while (i) {
    i--;
    let minMax_index = i - 1;  // i - 1 当前位置  minmax 记录最小的大于当前位置的值
    for (let index = i; index < len; index++) { // nums[i - 1] 当前元素
      if (nums[i - 1] < nums[index]) {
        minMax_index = minMax_index === i - 1 ? index : minMax_index
      }
      if (nums[i - 1] < nums[index] && nums[minMax_index] > nums[index]) {
        minMax_index = index;
        flag = true;
        let t = nums[i - 1];
        nums[i - 1] = nums[minMax_index];
        nums[minMax_index] = t;
        break;
      }
    }

    if ((minMax_index !== i - 1) && !flag) {
      flag = true;
      let t = nums[i - 1];
      nums[i - 1] = nums[minMax_index];
      nums[minMax_index] = t;
      break;
    }
  }
  if (!flag) {
    nums.sort((a, b) => a - b)
  }

  console.log(nums)
  return nums
};

// nextPermutation([1])
// nextPermutation([1, 2, 3])
// nextPermutation([1, 3, 2])
nextPermutation([2, 3, 1])

/**
 * 从尾部向首部开始 找出后面数字比当前位置大的【最小的】   调换位置
 * 当前的要和后面位置中比当前位置小的【最大的】交换位置
 */


xxx