// 1. 双向链表节点
class DLNode {
    key: number;
    value: number;
    prev: DLNode | null = null;
    next: DLNode | null = null;

    constructor(key: number = 0, value: number = 0) {
        this.key = key;
        this.value = value;
    }
}

class LRUCache {
    private capacity: number;
    private map: Map<number, DLNode>;
    private head: DLNode; // 头哨兵 (MRU)
    private tail: DLNode; // 尾哨兵 (LRU)

    constructor(capacity: number) {
        this.capacity = capacity;
        this.map = new Map();
        
        // 初始化两个哨兵，并让它们互相连接
        this.head = new DLNode();
        this.tail = new DLNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // 辅助函数 A：把一个节点从链表中彻底“抠”出来
    private removeNode(node: DLNode): void {
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
    }

    // 辅助函数 B：把一个节点插到头哨兵后面（即标记为最近使用）
    private addToHead(node: DLNode): void {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next!.prev = node;
        this.head.next = node;
    }

    // 辅助函数 C：移动一个已有节点到头部（重用上面两个函数）
    private moveToHead(node: DLNode): void {
        this.removeNode(node);
        this.addToHead(node);
    }
}