class ListNode<T> {
    val: T | null; 
    next: ListNode<T> | null;

    constructor(val: T | null = null, next: ListNode<T> | null = null) {
        this.val = val;
        this.next = next;
    }
}
class SinglyLinkedList<T> {
    private sentinel: ListNode<T>;
    private size: number;

    constructor() {
        // 初始化哨兵节点，永远站在最前面镇守
        this.sentinel = new ListNode<T>(null);
        this.size = 0;
    }

    // 头部插入: O(1) 极速操作
    addFirst(val: T): void {
        // 新节点的 next 指向目前的第一个真实节点
        this.sentinel.next = new ListNode<T>(val, this.sentinel.next);
        this.size++;
    }

    // 头部删除: O(1) 极速操作
    removeFirst(): T | null {
        if (this.sentinel.next === null) {
            return null; // 空链表
        }
        const firstNode = this.sentinel.next;
        // 绕过第一个节点
        this.sentinel.next = firstNode.next; 
        this.size--;
        return firstNode.val;
    }

    // 尾部插入: O(N) 操作
    addLast(val: T): void {
        let curr = this.sentinel;
        // 因为只有 next 指针，只能从头开始找最后一个节点
        while (curr.next !== null) {
            curr = curr.next;
        }
        curr.next = new ListNode<T>(val);
        this.size++;
    }
}