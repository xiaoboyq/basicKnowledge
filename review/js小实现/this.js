function Foo() {
   getName = function() {
    console.log(1)
  }
  return this;
}

function getName() {
  console.log('222')
}

Foo().getName(); // 1

var a = 3 
(function() {
  console.log(a)
  var a = 4;
})()


var a = 3 
(function() {
  console.log(a)
  let a = 4;
})()
