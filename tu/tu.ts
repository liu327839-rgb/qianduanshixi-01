class Graph {
    adjList: Map<number, number[]>;

    constructor() {
        this.adjList = new Map();
    }

    // 1. 添加节点 (Vertex)
    addVertex(vertex: number): void {
        if (!this.adjList.has(vertex)) {
            this.adjList.set(vertex, []);
        }
    }
    addEdge(src: number, dest: number): void { 
        this.adjList.get(src)!.push(dest);
    }
}