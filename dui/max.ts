function buildMax(arr: number[]): number[] {
  let n: number = arr.length;
  for (let i = Math.floor((n - 1) / 2); i >= 0; i--) {
    heapify(arr, i, n);
  }
  return arr;
}

function swap(arr: number[], i: number, j: number): number[] {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}

function heapify(arr: number[], i: number, n: number): void {
  let largest: number = i;
  let left: number = 2 * largest + 1;
  let right: number = 2 * largest + 2;
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest != i) {
    swap(arr, i, largest);
    heapify(arr, largest, n);
  }
}
