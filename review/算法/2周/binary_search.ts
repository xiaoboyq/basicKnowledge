/**
 * 二分查找
*/

function binarySearch(arr: number[], target: number): number {
  const len = arr.length;
  if(!len) return -1

  let startIndex = 0;
  let endIndex =  len - 1;

  while(startIndex <= endIndex) {
    const midIndex =  Math.floor((startIndex + endIndex) /2)
    const midValue = arr[midIndex];
    if(midValue < target) {
      startIndex = midIndex + 1
    } else if(midValue > target){
      endIndex = midIndex - 1
    } else {
      return midIndex
    }
  }

  return -1
}
const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
const target = 40
console.info(binarySearch(arr, target))