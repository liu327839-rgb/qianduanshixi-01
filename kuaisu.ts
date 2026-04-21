function kuaisu(arr:number[]):number[]{
    if(arr.length<=1){
        return arr;
    }
    let shuzuzhongzhi = arr[arr.length-1];
    let zuoshuzu :number[] = [];
    let youshuzu :number[] = [];
    for(let i=0;i<arr.length-1;i++){
        if(arr[i]<shuzuzhongzhi){
            zuoshuzu.push(arr[i]);
        }else{
            youshuzu.push(arr[i]);
        }
    }
    return [...kuaisu(zuoshuzu), shuzuzhongzhi, ...kuaisu(youshuzu)];
    
}
