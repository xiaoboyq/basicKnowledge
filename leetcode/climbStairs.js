/**
 * @param {number} n
 * @return {number}
 */
 var climbStairs = function(n) {
   if(n === 1) {
     return 1
   }
   if(n === 2) {
     return 2
   }

   let n1 = 1;
   let n2 = 2;
   let res = 0

   for(let i = 2; i < n; i++) {
     res = n1 + n2;
     n1 = n2;
     n2 = res
   }
   return res
};

console.log(climbStairs(3))