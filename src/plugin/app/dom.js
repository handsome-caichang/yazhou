let dom = {}

// 获取最终应用在元素上的样式的集合对象
// PseudoClasses代表伪类, 如没有可以传空
dom.getStyle = function getStyle(el, PseudoClasses = null) {
    let style = null;

    if (window.getComputedStyle) {
        style = window.getComputedStyle(el, null);
    } else {
        style = el.currentStyle;
    }

    return style;
}

// 判断传入dom节点是否包含指定类名
dom.hasClass = function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}


// 给传入dom节点增加指定类名
dom.addClass = function addClass(el, className) {
    if (dom.hasClass(el, className)) {
        return
    }

    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

// 给传入dom节点删除指定类名
dom.removeClass = function removeClass(el, className) {
    if (!dom.hasClass(el, className)) {
        return
    }

    let classArr = el.className.split(' ')
    let index = classArr.indexOf(className)
    classArr.splice(index, 1)
    el.className = classArr.join(' ')
}

// 设置或获取指定DOM的'data-'属性
dom.getData = function getData(el, name, val) {
    const prefix = 'data-'
    if (val) {
        return el.setAttribute(prefix + name, val)
    }
    return el.getAttribute(prefix + name)
}



// 判断浏览器前缀支持情况
let vendor = (() => {
    let elementStyle = document.createElement('div').style

    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }

    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key
        }
    }

    return false
})()

// 跟据浏览器前缀支持情况，返回相应的CSS
dom.prefixStyle = function prefixStyle(style) {
    if (vendor === false) {
        return false
    }

    if (vendor === 'standard') {
        return style
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}


//解析转义dom
dom.parseDom =  function parseDom(arg) {
    var objE = document.createElement("div");
    objE.innerHTML = arg;
    return objE.innerText;
};

// 获取一个附加到'body'的空的'div'元素
dom.getEl = function getEl () {
    let el = document.createElement('div');
    document.querySelector('body').appendChild(el);
    return el;
}

export default dom;