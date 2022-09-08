function thousandSeparator(num) {
  return (
    num &&
    (num.toString().indexOf('.') !== -1
      ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, ($1, $2) => {
          console.log('$1', $1)
          console.log('$2', $2)
          return `${$2},`;
        })
      : num.toString().replace(/(\d)(?=(\d{3})+\b)/g, ($1, $2) => {
          console.log($1)
          console.log($2)
          return `${$2},`;
        }))
  );
}

console.log(thousandSeparator(124125123.123123))
