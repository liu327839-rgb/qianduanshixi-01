/**
 * 堆排序可视化状态接口
 */
interface 堆排序状态 {
    数据: number[];      // 当前数组副本
    活跃索引: number[]; // 当前正在比较或交换的索引
    堆大小: number;    // 当前堆的有效边界
    描述: string; // 当前步骤描述
}

/**
 * 堆排序可视化器 核心类
 * 采用状态预生成机制，支持双向步进控制
 */
export class 堆排序可视化器 {
    private 状态列表: 堆排序状态[] = [];
    private 当前索引: number = 0;
    private 原始数据: number[] = [];

    constructor(input: number[]) {
        this.原始数据 = [...input];
        this.生成状态();
    }

    /**
     * 执行堆排序并记录每一个原子操作状态
     * 复杂度: O(n log n)
     */
    private 生成状态(): void {
        const 数组 = [...this.原始数据];
        const n = 数组.length;
        this.状态列表 = [];

        // 初始状态
        this.记录状态(数组, [], n, "初始化数组");

        // 1. 构建大顶堆 (Build Max Heap)
        // 从最后一个非叶子节点开始向下调整
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.大顶堆调整(数组, n, i, "构建堆: 调整节点 " + i);
        }

        // 2. 排序过程
        // 依次将堆顶(最大值)交换至末尾，并缩小堆范围
        let 当前堆大小 = n;
        for (let i = n - 1; i > 0; i--) {
            this.记录状态(数组, [0, i], 当前堆大小, `交换堆顶 ${数组[0]} 与末尾 ${数组[i]}`);
            [数组[0], 数组[i]] = [数组[i], 数组[0]];
            当前堆大小--;
            this.大顶堆调整(数组, 当前堆大小, 0, `维护堆: 调整堆顶`);
        }

        this.记录状态(数组, [], 0, "排序完成");
    }

    /**
     * 维护大顶堆性质
     * @param 数组 数组引用
     * @param size 当前有效堆大小
     * @param i 待调整的节点索引
     */
    private 大顶堆调整(数组: number[], size: number, i: number, desc: string): void {
        let 最大值 = i;
        const 左子 = 2 * i + 1;
        const 右子 = 2 * i + 2;

        this.记录状态(数组, [i], size, desc);

        if (左子 < size && 数组[左子] > 数组[最大值]) {
            最大值 = 左子;
        }
        if (右子 < size && 数组[右子] > 数组[最大值]) {
            最大值 = 右子;
        }

        if (最大值 !== i) {
            this.记录状态(数组, [i, 最大值], size, `交换节点 ${i} 与 ${最大值}`);
            [数组[i], 数组[最大值]] = [数组[最大值], 数组[i]];
            // 递归调整受影响的子树
            this.大顶堆调整(数组, size, 最大值, desc);
        }
    }

    private 记录状态(数组: number[], active: number[], size: number, desc: string): void {
        this.状态列表.push({
            数据: [...数组],
            活跃索引: [...active],
            堆大小: size,
            描述: desc
        });
    }

    // 控制接口
    public 下一步(): 堆排序状态 | null {
        if (this.当前索引 < this.状态列表.length - 1) {
            return this.状态列表[++this.当前索引];
        }
        return null;
    }

    public prev(): HeapSortState | null {
        if (this.currentIndex > 0) {
            return this.states[--this.currentIndex];
        }
        return null;
    }

    public reset(): HeapSortState {
        this.currentIndex = 0;
        return this.states[0];
    }

    public end(): HeapSortState {
        this.currentIndex = this.states.length - 1;
        return this.states[this.currentIndex];
    }
}