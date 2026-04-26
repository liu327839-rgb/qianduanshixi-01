class Graph {
    adjList: Map<number, number[]>;

    constructor() {
        this.adjList = new Map();
    }

    // 1. 添加节点 (Vertex)
    addVertex(vertex: number): void {
        // 如果图里还没有这个节点，就给它初始化一个空的邻居数组
        if (!this.adjList.has(vertex)) {
            this.adjList.set(vertex, []);
        }
    }

    addEdge(src: number, dest: number): void { 
        this.adjList.get(src)!.push(dest);
    }
}