function guibing(arr: number[]): number[] {
    if(arr.length <=1){
        return arr;
    }
    let mid = Math.floor(arr.length/2);
    let left = guibing(arr.slice(0,mid));
    let right = guibing(arr.slice(mid));
    return merge(left,right);

}

function merge(left: number[], right: number[]): number[] {
    let result: number[] = [];
    let i = 0, j = 0;
    while(i < left.length && j < right.length){
        if(left[i] < right[j]){
            result.push(left[i]);
            i++;
        }else{
            result.push(right[j]);
            j++;
        }
    }
   return [...result, ...left.slice(i), ...right.slice(j)];
}

function guibing02(arr: number[]): number[] {
    let n =arr.length;
    if(n<=10){
        return arr
    }
    for (let step = 1; step < n; step *= 2) {
        
        for (let left = 0; left < n - step; left += 2 * step) {
            
            let mid = left + step;
           
            let right = Math.min(left + 2 * step, n);

            
            let arr1 = arr.slice(left, mid);
            let arr2 = arr.slice(mid, right);

            let merged = guibing02zuijiang(arr1, arr2);

           
            for (let i = 0; i < merged.length; i++) {
                arr[left + i] = merged[i];
            }
        }
    }


    return arr
}

function guibing02zuijiang(arr1: number[], arr2: number[]): number[] {
    let l = 0, r = 0;
    let newArr: number[] = [];
    while(l<arr1.length && r<arr2.length){

        if(arr1[l]<arr2[r]){
            newArr.push(arr1[l]);
            l++;
        }else if(arr1[l]>arr2[r]){
            newArr.push(arr2[r]);
            r++;
        }
        else{
            newArr.push(arr1[l]);
            newArr.push(arr2[r]);
            l++;
            r++;
        }
    }
    return [...newArr, ...arr1.slice(l), ...arr2.slice(r)];
}