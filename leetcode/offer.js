var CQueue = function() {
  this.stack1 = [];
  this.stack2 = []

};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
  this.stack1.push(value)
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
  // if(this.stack2.length) {
  //   return this.stack2.pop()
  // } 
  // while(this.stack1.length) {
  //   this.stack2.push(this.stack1.pop())
  // }
  // return this.stack2.pop() || -1

  if(!(this.stack1.length||this.stack2.length)) return -1; // 两个栈都空了才返回 -1
  if(!this.stack2.length) {
      // 只有每次 (出栈)stack2 空了，才将 (入栈)stack1 中的元素加入到 stack2
      // 这样才可以保证 队列的 特性: 先进先出
      while(this.stack1.length) {
          let val = this.stack1.pop();
          this.stack2.push(val);
      }
  }
  return this.stack2.pop();
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */


/**
 * initialize your data structure here.
 */
 var MinStack = function() {
  this.minStack = []
  this.dataStack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  this.dataStack.push(x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {

};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {

};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */

