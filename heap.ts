function heap(arr:number[]):number[]{
    buildmaxheap(arr);
    for(let i=arr.length-1;i>0;i--){
        swap(arr,0,i);
        heapify(arr,0,i);
    }
    return arr;

}
function buildmaxheap(arr:number[]):void{
    let n:number=arr.length;
    for(let i=Math.floor((n-1)/2);i>=0;i--){
        heapify(arr,i,n);
    }

}

function heapify(arr:number[],i:number,n:number):void{
    let largest:number=i;
    let left:number=2*largest+1;
    let right:number=2*largest+2;
    if(left<n&&arr[left]>arr[largest]){
        largest=left;
    }
    if(right<n&&arr[right]>arr[largest]){
        largest=right;
    }
    if(largest!=i){
        swap(arr,i,largest);
        heapify(arr,largest,n);
    }

}

function swap(arr:number[],i:number,j:number):void{
    let temp :number=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
    
}