function bfs(node) {
  let nodes = [];
  if (node) {
    // 利用队列先进先出的特性，取第一个出来加进nodes里面
    let queue = [];
    queue.push(node);
    while (queue.length) {
      let item = queue.shift();
      nodes.push(item);
      let child = item.children;
      for (let i = 0; i < child.length; i++) {
        // 按顺序从左到右加进队列
        queue.push(child[i]);
      }
    }
  }
  return nodes;
}
