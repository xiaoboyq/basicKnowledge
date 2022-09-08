/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 var removeNthFromEnd = function(head, n) {
   let root =  new ListNode(0, head)
   let p = root;
   let cur = root;
   

   while(n > 0) {
     p = p.next;
     n--;
   }
   while(p.next) {
    cur = cur.next;
    p = p.next;
   }

   cur.next = cur.next.next
   return root.next
};