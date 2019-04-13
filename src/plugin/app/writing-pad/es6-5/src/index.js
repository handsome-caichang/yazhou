import {
    addListener,
    removeListener,
    getClientXY
} from './child/dom.js'

import {
    ENV,
    CONFIG,
} from './child/base.js'

import {
    Paint
} from './child/canvas.js'

import {throttle} from './child/util.js'



class Handwriting{
    constructor(el,width=300,height=300,options={}){
        if (!(el instanceof HTMLElement)){
            throw new Error('容器不是HTML元素');
        }    
        
        this.containerDOM = el;
        this.canvasDOM = document.createElement('canvas');
        this.width = width * CONFIG.CANVAS_MUTIPLE;     //画布宽度
        this.height = height * CONFIG.CANVAS_MUTIPLE;   //画布高度
        this.cssWidth = 0;      //画布的css宽度
        this.cssHeight = 0;     //画布的css高度
        this.canvasDOM.setAttribute('width',this.width);
        this.canvasDOM.setAttribute('height',this.height);  
        this.canvasDOM.style.width = '100%';    //撑满父容器
        this.canvasDOM.style.height = '100%';

        this.canvasDOMPos = null; //canvas的clientX和clientY

        this.x = -1;     //鼠标或触摸位置点
        this.y = -1;     //鼠标或触摸位置点
        
        if (!this.canvasDOM.getContext){
            throw new Error('该环境不支持canvas');
        }                

        this.paint = new Paint(this.canvasDOM.getContext('2d'),this.width,this.height,options);
        this.init();
    }
    init(){
        this.containerDOM.appendChild(this.canvasDOM);
        setTimeout(() => {
            this.cssWidth = this.canvasDOM.offsetWidth;
            this.cssHeight = this.canvasDOM.offsetHeight;
            this.bindEvt();    
        }, 0);                
    }


    bindEvt(){
        let isHold = false;
        if (ENV.isMobile){      //移动端
            addListener(this.canvasDOM,'touchstart',(e)=>{
                e.preventDefault();
                this.canvasDOMPos = getClientXY(this.canvasDOM); 
                let touch = e.targetTouches;
                if (touch.length === 1){
                    isHold = true;
                    this.computePos(touch[0].clientX,touch[0].clientY); 
                    this.paint.start(this.x,this.y);        //画笔开始
                } else {
                    isHold = false;
                }                
            });
            addListener(this.canvasDOM, 'touchmove', throttle((e)=>{
                
                let touch = e.targetTouches;
                if (touch.length === 1 && isHold){
                    this.computePos(touch[0].clientX,touch[0].clientY);     //@TODO 有可能滑出canvas
                    this.paint.joinStep(this.x,this.y);     //画笔绘画路径     
                }
            },CONFIG.MOVE_INTERVEL,1));
            addListener(this.canvasDOM,'touchend',(e)=>{
                isHold = false;
            })
        } else {        //PC
            let listener;
                
            addListener(this.canvasDOM, 'mousedown',(e)=>{
                e.preventDefault();                
                this.canvasDOMPos = getClientXY(this.canvasDOM);
                this.computePos(e.clientX,e.clientY);
                isHold = true;
                this.paint.start(this.x,this.y);

                listener = throttle((evt)=>{
                    this.computePos(evt.clientX,evt.clientY);                   
                    if (isHold){
                        this.paint.joinStep(this.x,this.y);
                    }

                },CONFIG.MOVE_INTERVEL,1);
                addListener(document.documentElement,'mousemove',listener);
            });            
            addListener(document.documentElement,'mouseup',(e)=>{
                removeListener(this.canvasDOM,'mousemove',listener);
                isHold = false;
            });
        }
    }

    //撤销
    undo(){
        this.paint.undo();
    }

    //根据鼠标或手指位置,计算在canvas中的位置;
    computePos(clientX,clientY){
        this.x = (clientX - this.canvasDOMPos.clientX) / this.cssWidth * this.width;
        this.y = (clientY - this.canvasDOMPos.clientY) / this.cssHeight * this.height;
    }

    unbindEvt(){
        removeListener(this.canvasDOM,'mousedown moousemove mouseup touchstart touchmove touchend');
    }

    saveJpg(){
        return this.canvasDOM.toDataURL('image/jpeg');
    }
    savePng(){
        return this.canvasDOM.toDataURL('image/png');
    }

    isEmpty(){
        return this.paint.isEmpty();
    }

    clear(){
        this.paint.clear();
    }

    destroy(){
        this.clear();
        this.unbindEvt();

    }
}
window.Handwriting = Handwriting;