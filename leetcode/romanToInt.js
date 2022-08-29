var romanToInt = function(roman) {
  const staticData = [
    ['I','II','III', 'IV', 'V', 'VI','VII','VIII', 'IX'],
    ['X','XX','XXX', 'XL', 'L', 'LX','LXX','LXXX', 'XC'],
    ['C','CC','CCC', 'CD', 'D', 'DC','DCC','DCCC', 'CM'],
    ['M','MM','MMM'],
  ];
  let res = 0

  for(let i = 0; i < 4; i++) {
    let numIndex = 0
    staticData[i].forEach((v, index)=> {
      if(roman.includes(v) ) {
        numIndex = index + 1
      }
    }
    ) 
    if(!numIndex) {
      continue 
    }
    // res += staticData[i].findIndex(numArr[numArr.length - 1]) + 1
    // res += staticData[i].findIndex(numArr[numArr.length - 1]) + 1
    res += numIndex*Math.pow(10, i)
  }
  console.log(res)
  return res
};

romanToInt('IV')