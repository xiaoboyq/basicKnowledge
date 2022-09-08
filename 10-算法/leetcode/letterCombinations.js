/**
 * @param {string} digits
 * @return {string[]}
 */
 var letterCombinations = function(digits) {
  const numsToString = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': [ 'w', 'x', 'y','z'],
  }
   let l = digits.length
   if(!l){
     return []
   }
  //  if(l === 1) {
  //   return numsToString[digits]
  // }

   digits =  digits.split('');
   let stiringsArr = numsToString[digits[0]]
   let arr = []
   for(let i = 1 ; i < l; i++ ) {
    arr.push(numsToString[digits[i]])
   }



   stiringsArr =  stiringsArr.map(item=> item+numsToString[digits[i]])
   console.log(stiringsArr)
   return stiringsArr
};

letterCombinations("23")