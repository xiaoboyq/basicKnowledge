/**
 * @param {number} num
 * @return {string}
 * I             1
 * V             5
 * X             10
 * L             50
 * C             100
 * D             500
 * M             1000
 * 例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。
 * I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
 * X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
 * C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
 * 给你一个整数，将其转为罗马数字。
 */
 var intToRoman = function(num) {
   const staticData = [
     ['','I','II','III', 'IV', 'V', 'VI','VII','VIII', 'IX'],
     ['','X','XX','XXX', 'XL', 'L', 'LX','LXX','LXXX', 'XC'],
     ['','C','CC','CCC', 'CD', 'D', 'DC','DCC','DCCC', 'CM'],
     ['','M','MM','MMM'],
   ];
  
   let res = staticData[3][Math.floor(num /1000)]
   num = num % 1000
    res += staticData[2][Math.floor(num /100)]
   num = num % 100
   res +=  staticData[1][Math.floor(num /10)]
   num = num % 10
   res +=  staticData[0][num]

   return res

};

console.log(intToRoman(1994))

//MCMXCIV