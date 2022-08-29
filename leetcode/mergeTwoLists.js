/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 var mergeTwoLists = function(l1, l2) {
   let resNode = new ListNode(0)
   let res = resNode
   while(l1 || l2) {
      let val1 =  l1 && l1.val 
      let val2 =  l2 && l2.val 
      if((val1||val1===0)&&(val2||val2===0)) {
        resNode.next = new ListNode(Math.min(val1, val2));
        resNode = resNode.next
        val1 <= val2 ?  l1 = l1.next : l2 = l2.next
      } else {
        resNode.next = new ListNode(val1 || val2);
        resNode = resNode.next;
        val1||val1===0 ? l1 = l1.next : l2 = l2.next
      }
   }

   return res
};

// 输入：l1 = [1,2,4], l2 = [1,3,4]
// 输出：[1,1,2,3,4,4]


var mergeTwoLists = function(l1, l2) {
  let result = null;
  //终止条件
  if(l1 == null) return l2;
  if(l2 == null) return l1;

  //判断数值大小递归
  if(l1.val < l2.val){
      result = l1;
      result.next = mergeTwoLists(l1.next,l2);
  }else{
      result = l2;
      result.next = mergeTwoLists(l2.next,l1);
  }

  //返回结果
  return result;
};