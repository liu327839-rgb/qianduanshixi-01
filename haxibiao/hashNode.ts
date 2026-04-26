class HashNode<V> {
    key: number;      // 键
    val: V;      // 值
    next: HashNode<V> | null; // 指向链表的下一个节点

    constructor(key: number, val: V) {
        this.key = key;
        this.val = val;
        this.next = null; 
    }
}

class HashTable<V> {
    // buckets：哈希表的桶数组，每个桶存放一条链表的头节点
    private buckets: Array<HashNode<V> | null>;
    private capacity: number;

    constructor(capacity: number = 7) {
        this.capacity = capacity;
        // 初始化桶数组，大小为 capacity，所有桶初始为空
        this.buckets = new Array(capacity).fill(null);
    }

    // 哈希函数：根据键计算其桶的索引
    private hash(key: number): number {
        let hashValue = key; 
        return hashValue % this.capacity; 
    }

    put(key: number, val: V): void {
        let index = this.hash(key); // 计算键的哈希桶索引
        let head = this.buckets[index]; // 获取该桶的链表头

        // 如果桶为空，直接插入新节点
        if (head === null) {
            this.buckets[index] = new HashNode(key, val);
            return;
        }

        // 桶不为空，遍历链表查找是否存在相同的键（处理碰撞）
        let curr = head;
        while (curr !== null) {
            // 找到相同键，更新其值
            if (curr.key === key) {
                curr.val = val;
                return;
            }
            
            // 到达链表末尾，跳出循环
            if (curr.next === null) {
                break;
            }
            curr = curr.next; // 继续遍历链表
        }
        
        // 将新节点添加到链表末尾
        curr.next = new HashNode(key, val);
    }

    // 查询键对应的值
    get(key: number): V | null {
        let index = this.hash(key); // 计算键的哈希桶索引
        let curr = this.buckets[index]; // 获取该桶的链表头

        // 遍历链表查找目标键
        while (curr !== null) {
            if (curr.key === key) {
                return curr.val; // 找到键，返回其值
            }
            curr = curr.next; // 继续遍历链表
        }
        
        return null; // 未找到该键
    }

    remove(key: number): void {
        let index = this.hash(key);
        let curr = this.buckets[index]; 
        let prev: HashNode<V> | null = null;
        
        // 遍历链表查找目标键
        while (curr !== null) {
            if (curr.key === key) {
                // 找到键，删除节点
                if (prev === null) {
                    // 删除头节点
                    this.buckets[index] = curr.next;
                } else {
                    // 删除非头节点
                    prev.next = curr.next;
                }
                return; // 删除完成，退出函数
            }
            prev = curr; // 更新前一个节点
            curr = curr.next; // 继续遍历链表
        }
    }

}

