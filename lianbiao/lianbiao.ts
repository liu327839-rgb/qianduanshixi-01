/**
 * 双向链表节点类
 * 
 * 每个节点包含：
 * - value: 存储的值
 * - prev: 指向前一个节点的指针
 * - next: 指向后一个节点的指针
 */
class Node<V> {
    value: V;
    prev: Node<V> | null;
    next: Node<V> | null;

    constructor(value: V) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

/**
 * 双向链表类 - 使用哨兵节点
 * 
 * 哨兵节点的优势：
 * 1. 避免频繁的 null 检查，代码更简洁
 * 2. 使头尾操作与中间操作逻辑统一
 * 3. 减少边界情况的处理
 * 
 * 实现原理：
 * - 创建一个虚拟的哨兵节点
 * - 哨兵节点的 next 指向链表的首个真实节点
 * - 哨兵节点的 prev 指向链表的最后一个真实节点
 * - 在空链表时，哨兵的 next 和 prev 都指向自己
 */
class DoublyLinkedList<V> {
    private sentinel: Node<V>;  // 哨兵节点（不存储有效数据）
    private size: number;       // 链表中真实节点的个数

    constructor() {
        // 创建哨兵节点
        this.sentinel = new Node<V>(null as any);
        // 初始化时，哨兵的 next 和 prev 都指向自己（表示空链表）
        this.sentinel.next = this.sentinel;
        this.sentinel.prev = this.sentinel;
        this.size = 0;
    }

    /**
     * 获取链表大小
     */
    getSize(): number {
        return this.size;
    }

    /**
     * 判断链表是否为空
     */
    isEmpty(): boolean {
        return this.size === 0;
    }

    /**
     * 在链表头部插入元素
     * 
     * 操作流程：
     * 1. 创建新节点
     * 2. 获取当前首个真实节点（sentinel.next）
     * 3. 调整指针关系
     */
    addFirst(value: V): void {
        this.insertAfter(this.sentinel, value);
    }

    /**
     * 在链表尾部插入元素
     * 
     * 操作流程：
     * 1. 创建新节点
     * 2. 获取当前最后一个真实节点（sentinel.prev）
     * 3. 调整指针关系
     */
    addLast(value: V): void {
        this.insertBefore(this.sentinel, value);
    }

    /**
     * 在指定节点之后插入新节点（内部辅助方法）
     * 
     * 指针调整示例：
     * 原：node1 <-> node2
     * 在 node1 之后插入 new_node：
     * 1. new_node.prev = node1
     * 2. new_node.next = node2
     * 3. node1.next = new_node
     * 4. node2.prev = new_node
     * 结果：node1 <-> new_node <-> node2
     */
    private insertAfter(node: Node<V>, value: V): void {
        const newNode = new Node(value);
        
        // 保存原来 node 的下一个节点
        const nextNode = node.next!;
        
        // 建立新节点与前驱的连接
        newNode.prev = node;
        newNode.next = nextNode;
        
        // 建立相邻节点与新节点的连接
        node.next = newNode;
        nextNode.prev = newNode;
        
        this.size++;
    }

    /**
     * 在指定节点之前插入新节点（内部辅助方法）
     */
    private insertBefore(node: Node<V>, value: V): void {
        const newNode = new Node(value);
        
        // 保存原来 node 的前一个节点
        const prevNode = node.prev!;
        
        // 建立新节点与后继的连接
        newNode.next = node;
        newNode.prev = prevNode;
        
        // 建立相邻节点与新节点的连接
        prevNode.next = newNode;
        node.prev = newNode;
        
        this.size++;
    }

    /**
     * 删除指定节点（内部辅助方法）
     * 
     * 操作流程：
     * 原：node1 <-> targetNode <-> node3
     * 删除 targetNode 后：
     * 1. node1.next = node3
     * 2. node3.prev = node1
     * 结果：node1 <-> node3
     */
    private removeNode(node: Node<V>): V {
        if (node === this.sentinel) {
            throw new Error("不能删除哨兵节点");
        }

        const value = node.value;
        const prevNode = node.prev!;
        const nextNode = node.next!;

        // 跳过当前节点，连接前后节点
        prevNode.next = nextNode;
        nextNode.prev = prevNode;

        this.size--;
        return value;
    }

    /**
     * 删除头部元素
     */
    removeFirst(): V | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.removeNode(this.sentinel.next!);
    }

    /**
     * 删除尾部元素
     */
    removeLast(): V | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.removeNode(this.sentinel.prev!);
    }

    /**
     * 删除指定值的第一个节点
     */
    remove(value: V): boolean {
        let current = this.sentinel.next;
        while (current !== this.sentinel) {
            if (current!.value === value) {
                this.removeNode(current!);
                return true;
            }
            current = current!.next;
        }
        return false;
    }

    /**
     * 获取头部元素（不删除）
     */
    getFirst(): V | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.sentinel.next!.value;
    }

    /**
     * 获取尾部元素（不删除）
     */
    getLast(): V | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.sentinel.prev!.value;
    }

    /**
     * 判断是否包含某个值
     */
    contains(value: V): boolean {
        let current = this.sentinel.next;
        while (current !== this.sentinel) {
            if (current!.value === value) {
                return true;
            }
            current = current!.next;
        }
        return false;
    }

    /**
     * 清空链表
     */
    clear(): void {
        this.sentinel.next = this.sentinel;
        this.sentinel.prev = this.sentinel;
        this.size = 0;
    }

    /**
     * 遍历链表（从头到尾）
     */
    forEach(callback: (value: V, index: number) => void): void {
        let current = this.sentinel.next;
        let index = 0;
        while (current !== this.sentinel) {
            callback(current!.value, index);
            current = current!.next;
            index++;
        }
    }

    /**
     * 反向遍历链表（从尾到头）
     */
    forEachReverse(callback: (value: V, index: number) => void): void {
        let current = this.sentinel.prev;
        let index = this.size - 1;
        while (current !== this.sentinel) {
            callback(current!.value, index);
            current = current!.prev;
            index--;
        }
    }

    /**
     * 转换为数组
     */
    toArray(): V[] {
        const result: V[] = [];
        let current = this.sentinel.next;
        while (current !== this.sentinel) {
            result.push(current!.value);
            current = current!.next;
        }
        return result;
    }

    /**
     * 获取指定索引的元素
     */
    get(index: number): V | undefined {
        if (index < 0 || index >= this.size) {
            return undefined;
        }

        let current: Node<V>;
        // 优化：从最近的一端开始遍历
        if (index < this.size / 2) {
            // 从头开始
            current = this.sentinel.next!;
            for (let i = 0; i < index; i++) {
                current = current.next!;
            }
        } else {
            // 从尾开始
            current = this.sentinel.prev!;
            for (let i = this.size - 1; i > index; i--) {
                current = current.prev!;
            }
        }

        return current.value;
    }

    /**
     * 打印链表内容（用于调试）
     */
    print(): void {
        console.log("链表内容（从头到尾）：");
        let current = this.sentinel.next;
        let elements: V[] = [];
        while (current !== this.sentinel) {
            elements.push(current!.value);
            current = current!.next;
        }
        console.log(elements);
        console.log(`链表大小：${this.size}\n`);
    }
}

// ============ 使用示例 ============

// 创建链表
const list = new DoublyLinkedList<number>();

console.log("=== 基础操作演示 ===\n");

// 在尾部添加元素
console.log("1. 添加元素 10, 20, 30 到尾部");
list.addLast(10);
list.addLast(20);
list.addLast(30);
list.print();

// 在头部添加元素
console.log("2. 添加元素 5 到头部");
list.addFirst(5);
list.print();

// 获取元素
console.log(`3. 获取头部元素：${list.getFirst()}`);
console.log(`   获取尾部元素：${list.getLast()}`);
console.log(`   获取索引 1 的元素：${list.get(1)}\n`);

// 删除操作
console.log("4. 删除头部元素");
const removed = list.removeFirst();
console.log(`   删除的元素：${removed}`);
list.print();

// 判断包含
console.log(`5. 链表是否包含 20：${list.contains(20)}`);
console.log(`   链表是否包含 100：${list.contains(100)}\n`);

// 遍历
console.log("6. 正向遍历链表：");
list.forEach((value, index) => {
    console.log(`   [${index}] = ${value}`);
});
console.log();

// 反向遍历
console.log("7. 反向遍历链表：");
list.forEachReverse((value, index) => {
    console.log(`   [${index}] = ${value}`);
});
console.log();

// 转为数组
console.log("8. 转换为数组：" + JSON.stringify(list.toArray()) + "\n");

// 清空
console.log("9. 清空链表");
list.clear();
console.log(`   链表大小：${list.getSize()}`);
console.log(`   是否为空：${list.isEmpty()}`);