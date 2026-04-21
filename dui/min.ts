function buildMin(arr:number[]):number[]{
     let n:number=arr.length;
    for(let i=Math.floor((n-1)/2);i>=0;i--){
        heapify(arr,i,n);
    }
    return arr;

}

function heapifymin(arr:number[],i:number,n:number):void{
    let smallest:number=i;
    let left:number=2*smallest+1;
    let right:number=2*smallest+2;
    if(left<n&&arr[left]<arr[smallest]){
        smallest=left;
    }
    if(right<n&&arr[right]<arr[smallest]){
        smallest=right;
    }
    if(smallest!=i){
        swap(arr,i,smallest);
        heapify(arr,smallest,n);
    }

}