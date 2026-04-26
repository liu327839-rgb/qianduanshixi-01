function dfs(node, nodes):number[] {
  nodes = nodes || [];
  if (node) {
    nodes.push(node);
    let child = node.children;
    for (let i = 0; i < child.length; i++) {
      dfs(child[i], nodes);
    }
  }
  return nodes;

}