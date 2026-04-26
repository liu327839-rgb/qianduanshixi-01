/**
 * 跳表节点定义
 */
class SkipListNode {
    public val: number;
    // forward[i] 表示当前节点在第 i 层的下一个节点
    public forward: SkipListNode[];

    constructor(val: number, level: number) {
        this.val = val;
        this.forward = new Array(level).fill(null);
    }
}

/**
 * 跳表 (Skip List)
 * 核心思想：通过概率引入多级索引的链表，典型的时间与空间权衡。
 * 期望时间复杂度：查找/插入/删除均为 O(log n)
 */
export class SkipList {
    private static readonly MAX_LEVEL = 32;
    private static readonly P_FACTOR = 0.5;

    private head: SkipListNode;
    private currentLevel: number;

    constructor() {
        // 头节点不存储有效数据，层数初始化为最大层数
        this.head = new SkipListNode(-1, SkipList.MAX_LEVEL);
        this.currentLevel = 1;
    }
    
    /**
     * 随机生成的层数
     * @returns {number} 随机生成的层数
     */
    private randomLevel(): number {
        let level = 1;
        while (Math.random() < SkipList.P_FACTOR && level < SkipList.MAX_LEVEL) {
            level++;
        }
        return level;
    }

    /**
     * 查找元素
     * 从最高层开始，逐步向右、向下逼近目标值
     * @param target 目标值
     * @returns {boolean} 是否存在
     */
    public search(target: number): boolean {
        let curr = this.head;
        for (let i = this.currentLevel - 1; i >= 0; i--) {
            while (curr.forward[i] !== null && curr.forward[i].val < target) {
                curr = curr.forward[i];
            }
        }
        curr = curr.forward[0];
        return curr !== null && curr.val === target;
    }

    /**
     * 插入元素
     * @param num 待插入的值
     */
    public insert(num: number): void {
        // update 数组用于记录每层需要更新指针的前驱节点
        const update: SkipListNode[] = new Array(SkipList.MAX_LEVEL).fill(this.head);
        let curr = this.head;

        // 1. 找到每层的前驱节点
        for (let i = this.currentLevel - 1; i >= 0; i--) {
            while (curr.forward[i] !== null && curr.forward[i].val < num) {
                curr = curr.forward[i];
            }
            update[i] = curr;
        }

        // 2. 获取随机层数并更新跳表的当前最大层数
        const randomLvl = this.randomLevel();
        this.currentLevel = Math.max(this.currentLevel, randomLvl);

        // 3. 创建新节点并调整指针（类似单链表的插入）
        const newNode = new SkipListNode(num, randomLvl);
        for (let i = 0; i < randomLvl; i++) {
            newNode.forward[i] = update[i].forward[i];
            update[i].forward[i] = newNode;
        }
    }

    /**
     * 删除元素
     * @param num 待删除的值
     * @returns {boolean} 是否删除成功
     */
    public erase(num: number): boolean {
        const update: SkipListNode[] = new Array(SkipList.MAX_LEVEL).fill(null);
        let curr = this.head;

        for (let i = this.currentLevel - 1; i >= 0; i--) {
            while (curr.forward[i] !== null && curr.forward[i].val < num) {
                curr = curr.forward[i];
            }
            update[i] = curr;
        }

        curr = curr.forward[0];

        // 如果没找到目标节点，直接返回
        if (curr === null || curr.val !== num) {
            return false;
        }

        // 逐层更新指针，跳过被删除的节点
        for (let i = 0; i < this.currentLevel; i++) {
            if (update[i].forward[i] !== curr) {
                break;
            }
            update[i].forward[i] = curr.forward[i];
        }

        // 维护当前的最高层数，去掉因为删除导致的空层
        while (this.currentLevel > 1 && this.head.forward[this.currentLevel - 1] === null) {
            this.currentLevel--;
        }

        return true;
    }
}