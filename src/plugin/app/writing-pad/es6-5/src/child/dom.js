const listenerMap = new Map();
function setListenerMap(el,listener){
    if (listenerMap.has(el)){
        listenerMap.get(el).push(listener);
    } else {
        listenerMap.set(el,[]);
    }
}
function getListenerMap(el){
    return listenerMap.get(el);
}


export function addListener(el,type,listener,options = {}){
    type.trim().split(/\s+/).forEach(event=>{        
        el.addEventListener(event,listener,options);
    })
    setListenerMap(el,listener);
}

export function removeListener(el,type,listener,options = {}){
    if (listener === undefined){
        listener = getListenerMap(el);
    }
    listener && type.trim().split(/\s+/).forEach(event=>{
        if (Array.isArray(listener)){
            listener.forEach(ln=>el.removeEventListener(event,ln,options));
        } else{
            el.removeEventListener(event,listener,options);
        }
    })
}

export function getClientXY(element) {
    let {top,left} = element.getBoundingClientRect();
    return {
        clientX:left,
        clientY:top
    };
  }