function cr(arr: number[]): number[] {
  let j: number;
  let temp: number;
  for (let i = 1; i < arr.length; i++) {
    temp = arr[i];
    j = i - 1;
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
  return arr;
}
