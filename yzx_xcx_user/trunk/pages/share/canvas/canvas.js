const CONFIG = {
    bgColor:'#fff',     //画布背景色
    radius:10,          //画布圆角半径
    padding:20,         //画布padding,暂不区分上下左右
}

class Canvas{
    constructor(context,w,h,drawList){
        this.context = context;
        this.width = w;
        this.height = h;
        this.drawList = drawList;
        
    }
    init(callback){
        let ctx = this.context,
            r = CONFIG.radius,
            PI = Math.PI;
        
        // 画布背景容器 start
        ctx.moveTo(0,r);
        ctx.arc(r,r,r,PI,1.5*PI);
        ctx.lineTo(this.width-r,0);
        ctx.arc(this.width-r,r,r,1.5*PI,0);
        ctx.lineTo(this.width,this.height-r);
        ctx.arc(this.width-r,this.height-r,r,0,0.5*PI);
        ctx.lineTo(r,this.height);
        ctx.arc(r,this.height-r,r,0.5*PI,PI);
        ctx.closePath();
        ctx.clip();
        ctx.fillStyle = CONFIG.bgColor;
        ctx.fillRect(0,0,this.width+1,this.height+1);
        // end

        // 处理画布padding
        ctx.translate(CONFIG.padding,CONFIG.padding);
        this.width = this.width - 2 * CONFIG.padding;
        this.height = this.height - 2 * CONFIG.padding;

        //绘画每个"部件"
        let shape = new Shape(this.context,this.width,this.height);

        let getImageInfo = function(item){
            let _resolve,_reject;
            wx.getImageInfo({
                src:item.content,
                success:opt=>{
                    item.content = opt.path;
                    _resolve(item)
                },
                fail:err=>_reject(err)
            })
            return new Promise((resolve,reject)=>{
                _resolve = resolve;
                _reject= reject;
            });
        }

        function drawList(list){
            return Promise.all(list.map(item=>getImageInfo(item)));
        }

        let imgList = this.drawList.filter(item=>item.type =='img');
        drawList(imgList).then(()=>{
            this.drawList.forEach(item=>shape.draw(item));
            ctx.draw(true,callback);
        })
        
        

    }    
}

class Shape{
    constructor(context,w,h){
        this.context = context;
        this.width = w;
        this.height = h;
    }

    draw(shape){
        this.context.save();
        shape.width = parse(shape.width,this.width);
        shape.left = parse(shape.left,this.width);
        switch (shape.render){
            case 'img-circle':this.drawCircleImg(shape);
                break;
            case 'img-normal': this.drawImg(shape);
                break;  
            case 'text-normal': this.strokeText(shape);
                break;
            case 'text-decoration': this.strokeTextDecoration(shape);
                break;
            case 'text-wrap': this.strokeWrapText(shape,true);
                break;
            case 'text-center': this.strokeWrapText(shape);
                break;
            case 'text-outline': this.strokeTextOutline(shape);
                break;
        }
        this.context.restore();
    }

    //画圆图
    drawCircleImg(shape){
        let ctx =this.context,
            r = shape.width/2;

        ctx.beginPath()
        ctx.arc(shape.left + r, shape.top + r, r, 0, 2*Math.PI);
        ctx.closePath();
        ctx.strokeStyle = "transparent";        
        ctx.stroke();        
        ctx.clip();
        ctx.drawImage(shape.content,shape.left,shape.top,shape.width,shape.height);

    }

    // 画普通图
    drawImg(shape){
        let ctx = this.context;
        ctx.beginPath();
        ctx.drawImage(shape.content,shape.left,shape.top,shape.width,shape.height);
    }

    //填充文字
    strokeText(shape,fn){
        let ctx = this.context;
        ctx.fillStyle = shape.color;
        ctx.strokeStyle = shape.color;
        ctx.font=shape.font;
        ctx.setTextBaseline('top');     //暂时不考虑动态配置,只用top

        let lineHeight = shape.lineHeight ? shape.lineHeight : shape.height;
        let rowNum = lineHeight ? Math.floor(shape.height/lineHeight) : 1,
            arr = this.measure(shape.content,shape.width,rowNum);
        arr.forEach((content,index)=>{
            ctx.fillText(content,shape.left,shape.top + lineHeight* index,shape.width);
            fn && fn(ctx,content,shape.left,shape.top + lineHeight,lineHeight);
        });

    }

    //填充文字,并且画横线
    strokeTextDecoration(shape){
        this.strokeText(shape,(ctx,content,x,y,lineHeight)=>{
            //画横线
            ctx.beginPath();
            ctx.moveTo(x,y-lineHeight/2 );
            ctx.lineTo(x+ctx.measureText(content).width,y-lineHeight/2);
            ctx.stroke();
        });  
    }

    //文字外包裹圆角的border
    strokeTextOutline(shape){
        this.strokeText(shape,(ctx,content,x,y,lineHeight)=>{
            const w = ctx.measureText(content).width;   
            ctx.beginPath();         
            ctx.arc(x,y - lineHeight/2, lineHeight/2, 0.5*Math.PI,1.5*Math.PI);
            ctx.arc(x+w,y - lineHeight/2, lineHeight/2, 1.5*Math.PI,0.5*Math.PI);
            ctx.closePath();
            ctx.stroke();      
        });
    }

    //两边是横线分隔
    strokeWrapText(shape,isLine){
        const margin = 15;
        //画横线
        let   ctx = this.context;
        ctx.font= shape.font;   

        let lineHeight = shape.lineHeight ? shape.lineHeight : shape.height,
              wordsWidth = ctx.measureText(shape.content).width,
              lineW = Math.floor((shape.width - wordsWidth - 2*margin) / 2),
              y = shape.top + lineHeight/2;

        ctx.strokeStyle = '#D7D7D7';
        if (isLine){
            ctx.beginPath();
            ctx.moveTo(shape.left ,y);
            ctx.lineTo(shape.left + lineW,y);        
            ctx.moveTo(shape.width ,y);
            ctx.lineTo(shape.width - lineW,y);
            ctx.stroke();
        }

        let shape1 = Object.assign({},shape);
        shape1.left = shape1.left + lineW + margin;
        this.strokeText(shape1);

    }

    //以当前设置好的字体样式,在区域内处理文字的换行或省略文字
    measure(content,width,rowNum){  
        function lineTest(ctx,words,width){
            let pointer = 1,
            testWords = words.slice(0,pointer);
            while (ctx.measureText(testWords).width < width && pointer <= words.length){
                pointer++;
                testWords = words.slice(0,pointer)
            }     
            return {
                pointer: pointer - 1,
                content: words.slice(0,pointer - 1)
            }
        }

        let arr = [],line;
        //分割前rowNum - 1行的文字
        for (let i =0; i < rowNum - 1; i++){
            line = lineTest(this.context,content,width);
            arr.push(line.content);
            content = content.slice(line.pointer);
        }

        //最后一行,可能需要省略号
        if (this.context.measureText(content).width < width){
            arr.push(content);
            return arr;
        } else {
            let  ellipsis = lineTest(this.context,content,width);
            arr.push(ellipsis.content.slice(0,ellipsis.content.length - 1)+'..');
        }
        return arr;
    }
}

function parse(f,w){   
    return typeof f === 'function' ? f(w) : f;
}


function render(ctx,w,h,drawList,callback){
    let cvs = new Canvas(ctx,w,h,drawList);
    cvs.init(callback);      
    
}

export default render;