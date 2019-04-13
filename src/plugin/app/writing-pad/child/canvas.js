import {CONTEXT_OPTION,CANVAS_OPTION} from './base.js'
export class Paint{
    constructor(context,width,height,options){
        this.context = context;
        this.width = width;
        this.height = height;
        this.init(options);
        this.initBg();
        this.paintHistory = new PaintHistory();
    }

    init(options){
        let opt = Object.assign({},CONTEXT_OPTION,options);
        Object.keys(opt).forEach(item=>{
            if (this.context[item] !== undefined){
                this.context[item] = opt[item]
            }
        });        
    }
    //设置画板背景
    initBg(){
        this.context.save();
        this.context.beginPath();
        this.context.rect(-100,-100, this.width + 100, this.height + 100);
        this.context.fillStyle = CANVAS_OPTION.background;
        this.context.fill();
        this.context.restore();
    }

    //开始画
    start(x,y){
        this.context.beginPath();
        this.context.moveTo(x,y)
        this.paintHistory.start(x,y);
    }

    //画下一个点
    joinStep(x,y){
        this.context.lineTo(x,y);
        this.context.stroke();
        this.context.beginPath();
        this.context.moveTo(x,y);
        this.paintHistory.join(x,y);
    }
    undo(){
        this.paintHistory.undo();
        //重绘历史纪录,支持回放。
        this.rePaint();
    }
    //重绘
    rePaint(){
        this.context.clearRect(0,0, this.width,this.height);
        this.initBg();
        this.paintHistory.get().forEach(item=>{
            this.context.beginPath();
            this.context.moveTo(item.moveTo[0],item.moveTo[1]);
            item.path.forEach(line=>{
                this.context.lineTo(line[0],line[1]);
                this.context.stroke();
                this.context.beginPath();
                this.context.moveTo(line[0],line[1]);
            })
        })

    }
    clear(){
        this.context.clearRect(0,0,this.width,this.height);
        this.initBg();
        this.paintHistory.clear();;
    }
}


class PaintHistory{
    constructor(){
        this.history = [];
    }

    get(){
        return this.history;
    }
    clear(){
        this.history = [];
    }

    start(x,y){
        this.history.push({
            moveTo:[x,y],
            path:[]
        });
    }

    join(x,y){
        this.history[this.history.length - 1].path.push([x,y]);
    }
    undo(){
        let p;
        do {
            p = this.history.pop();
        } while ( p && p.path.length == 0);
    }
}