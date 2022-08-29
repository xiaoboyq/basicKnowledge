// var salasOffices = {};

// salasOffices.clientList = [];

// salasOffices.listen = function(fn) {
//   this.clientList.push(fn);
// }
// salasOffices.trigger = function() {
//   for(let i =1, fn; fn = this.clientList[i]; i++ ) {
//     fn.apply(fn,arguments);
//   }
// }

// salasOffices.listen(function(price, squareMeter){
//   console.log('价格:'+ price)
//   console.log('squareMeter:'+ squareMeter)
// })

// salasOffices.listen(function(price, squareMeter){
//   console.log('价格='+ price)
//   console.log('squareMeter='+ squareMeter)
// })

// salasOffices.trigger(20000,88)
// salasOffices.trigger(30000,110)


// 改进1   Event 封装通用
// var Event  = {
//   clientList: [],
//   listen: function(fn) {
//     this.clientList.push(fn);
//   },
//   trigger: function() {
//     for(let i = 0, fn; fn = this.clientList[i]; i++) {
//       fn.apply(this,arguments);
//     }
//   }
// }

// var ininEvent = function(obj) {
//   for(let evet in Event) {
//     obj[evet] = Event[evet]
//   }
// }

// var salasOffices = {}
// ininEvent(salasOffices)

// salasOffices.listen(function(price, squareMeter){
//   console.log('价格:'+ price)
//   console.log('squareMeter:'+ squareMeter)
// })

// salasOffices.listen(function(price, squareMeter){
//   console.log('价格='+ price)
//   console.log('squareMeter='+ squareMeter)
// })

// salasOffices.trigger(20000,88)
// salasOffices.trigger(30000,110)

var Event = function(){
  Event  = {
      clientList: [],
      listen: function(fn) {
        this.clientList.push(fn);
      },
      trigger: function() {
        for(let i = 0, fn; fn = this.clientList[i]; i++) {
          fn.apply(this,arguments);
        }
      }
    }

    return Event
}()