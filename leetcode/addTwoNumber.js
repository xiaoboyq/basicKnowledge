/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 


/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

 function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}


 var addTwoNumbers = function(l1, l2) {
   let resNode = new ListNode(0)
   let tailNode = resNode; // 

   let flag = 0;
   while(l1 || l2 || flag) {
    let val1 = l1 ? l1.val || 0 : 0;
    let val2 = l2 ? l2.val || 0 : 0;

    let resVal = val1 + val2 + flag;
    flag =  resVal >= 10 ? 1 : 0;
    if(l1) l1 = l1.next;
    if(l2) l2 = l2.next;
    resVal = resVal % 10;
    tailNode.next = new ListNode(resVal);
    tailNode =  tailNode.next
   }
   return resNode.next
};