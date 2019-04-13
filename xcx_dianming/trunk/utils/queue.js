//执行队列
export default function(){
    let queue = [],
        isFinished = {
            flag:1,                 //0:未完成,1:已完成,-1:失败
        };
    //把一个操作推入队列，等待执行
    function push(fn){
        isFinished.flag = 0;
        if (queue.length === 0){
            queue.push(fn);
            setTimeout(() => {
                exec();    
            }, 0);            
        } else {
            queue.push(fn);
        }
    }
    function exec(){
        if (queue.length === 0){
            isFinished.flag = 1;
        } else {
            new Promise( (rsv,rej) =>{
                let fn = queue[0];
                fn(rsv,rej);
            }).then(()=>{
                queue.shift();
                exec();
            }).catch(()=>isFinished.flag = -1);
        }
    }

    return {
        push,
        isFinished
    }
}
