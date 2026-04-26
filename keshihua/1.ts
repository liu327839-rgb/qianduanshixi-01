/**
 * 堆排序可视化状态接口
 */
interface HeapSortState {
    data: number[];      // 当前数组副本
    activeIndices: number[]; // 当前正在比较或交换的索引
    heapSize: number;    // 当前堆的有效边界
    description: string; // 当前步骤描述
}

/**
 * HeapSortVisualizer 核心类
 * 采用状态预生成机制，支持双向步进控制
 */
export class HeapSortVisualizer {
    private states: HeapSortState[] = [];
    private currentIndex: number = 0;
    private rawData: number[] = [];

    constructor(input: number[]) {
        this.rawData = [...input];
        this.generateStates();
    }

    /**
     * 执行堆排序并记录每一个原子操作状态
     * 复杂度: O(n log n)
     */
    private generateStates(): void {
        const arr = [...this.rawData];
        const n = arr.length;
        this.states = [];

        // 初始状态
        this.recordState(arr, [], n, "初始化数组");

        // 1. 构建大顶堆 (Build Max Heap)
        // 从最后一个非叶子节点开始向下调整
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.maxHeapify(arr, n, i, "构建堆: 调整节点 " + i);
        }

        // 2. 排序过程
        // 依次将堆顶(最大值)交换至末尾，并缩小堆范围
        let currentHeapSize = n;
        for (let i = n - 1; i > 0; i--) {
            this.recordState(arr, [0, i], currentHeapSize, `交换堆顶 ${arr[0]} 与末尾 ${arr[i]}`);
            [arr[0], arr[i]] = [arr[i], arr[0]];
            currentHeapSize--;
            this.maxHeapify(arr, currentHeapSize, 0, `维护堆: 调整堆顶`);
        }

        this.recordState(arr, [], 0, "排序完成");
    }

    /**
     * 维护大顶堆性质
     * @param arr 数组引用
     * @param size 当前有效堆大小
     * @param i 待调整的节点索引
     */
    private maxHeapify(arr: number[], size: number, i: number, desc: string): void {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        this.recordState(arr, [i], size, desc);

        if (left < size && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right < size && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            this.recordState(arr, [i, largest], size, `交换节点 ${i} 与 ${largest}`);
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            // 递归调整受影响的子树
            this.maxHeapify(arr, size, largest, desc);
        }
    }

    private recordState(arr: number[], active: number[], size: number, desc: string): void {
        this.states.push({
            data: [...arr],
            activeIndices: [...active],
            heapSize: size,
            description: desc
        });
    }

    // 控制接口
    public next(): HeapSortState | null {
        if (this.currentIndex < this.states.length - 1) {
            return this.states[++this.currentIndex];
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