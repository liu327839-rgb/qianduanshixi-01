// 1. 获取 DOM 元素 (原生操作的起手式)
const arrayInput = document.getElementById('array-input') as HTMLInputElement;
const btnInit = document.getElementById('btn-init') as HTMLButtonElement;
const btnNext = document.getElementById('btn-next') as HTMLButtonElement;
const btnPrev = document.getElementById('btn-prev') as HTMLButtonElement;
const actionMessage = document.getElementById('action-message') as HTMLParagraphElement;
const treeContainer = document.getElementById('tree-container') as HTMLDivElement;
const arrayContainer = document.getElementById('array-container') as HTMLDivElement;

// 2. 状态变量 (脱离了 Vue，我们要自己管理这些数据)
let currentArray: number[] = [];
let treeDomNodes: HTMLElement[] = [];  // 保存树上的 DOM 小球
let arrayDomNodes: HTMLElement[] = []; // 保存下方的 DOM 方块

// 容器的尺寸，用于计算坐标
const TREE_WIDTH = 900; 
const NODE_SIZE = 40;

// 3. 核心数学运算：计算二叉树中第 i 个节点的 (X, Y) 坐标
function getTreeNodePosition(index: number, totalNodes: number): { x: number, y: number } {
    // 根节点 index=0，深度 depth=0
    const depth = Math.floor(Math.log2(index + 1)); 
    // Y坐标很简单，每层相距 70px，往下挪一点
    const y = depth * 70 + 20; 

    // 计算 X 坐标稍微复杂：
    // 该层的总节点数（比如第 0 层 1 个，第 1 层 2 个，第 2 层 4 个）
    const nodesInThisLevel = Math.pow(2, depth);
    // 该节点在当前层是第几个 (从 0 开始)
    const posInLevel = index - (nodesInThisLevel - 1);
    
    // 把水平空间平分
    const spacing = TREE_WIDTH / nodesInThisLevel;
    // 坐标 = 间距的一半 + (前面有几个节点 * 间距) - 节点自身半径(为了居中)
    const x = (spacing / 2) + posInLevel * spacing - (NODE_SIZE / 2);

    return { x, y };
}

// 4. 初始化视图：根据输入生成 DOM
function initializeVisuals() {
    // 解析输入框的值，转换成数字数组
    const inputStr = arrayInput.value;
    currentArray = inputStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    
    if (currentArray.length === 0) {
        actionMessage.innerText = "请输入有效的数字！";
        return;
    }

    // 清空画布
    treeContainer.innerHTML = '';
    arrayContainer.innerHTML = '';
    treeDomNodes = [];
    arrayDomNodes = [];

    // 遍历数组，创建原生 DOM 节点
    currentArray.forEach((value, index) => {
        // --- 创建树节点 (上方的圆形) ---
        const treeNode = document.createElement('div');
        treeNode.className = 'node tree-node';
        treeNode.innerText = value.toString();
        
        // 计算位置并利用 transform 放置
        const pos = getTreeNodePosition(index, currentArray.length);
        treeNode.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        
        treeContainer.appendChild(treeNode);
        treeDomNodes.push(treeNode);

        // --- 创建数组节点 (下方的方形) ---
        const arrNode = document.createElement('div');
        arrNode.className = 'node array-node';
        arrNode.innerText = value.toString();
        
        // 一维数组排成一排，每个间隔 50px
        const arrX = index * 50 + 20;
        arrNode.style.transform = `translate(${arrX}px, 30px)`;
        
        arrayContainer.appendChild(arrNode);
        arrayDomNodes.push(arrNode);
    });

    actionMessage.innerText = "初始化完成，等待建堆...";
    
    // 禁用/启用按钮
    btnNext.disabled = false;
    btnPrev.disabled = true;
    
    // TODO: 这里将来要调用 "计算堆排序历史步骤" 的函数
}

// 5. 绑定事件监听器
btnInit.addEventListener('click', initializeVisuals);

// 页面加载完成后自动初始化一次
window.addEventListener('DOMContentLoaded', initializeVisuals);