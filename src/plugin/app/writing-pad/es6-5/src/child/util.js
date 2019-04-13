export function throttle2(fn,wait,type = 1){
    let previous = 0,   
        timeout = null;        
    return function(){
        if (type == 1){
            let now = Date.now();
            if (now - previous > wait){
                fn.apply(this,arguments);
                previous = now;
            }
        } else if (type == 2){
            if (!timeout){
                timeout = setTimeout(() => {
                    timeout = null;
                    fn.apply(this,arguments);
                }, wait);
            }
        }
    }
}

//@TODO  touchmove，mousemove的频率控制。
export const throttle = fn => fn;