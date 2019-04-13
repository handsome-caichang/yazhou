var arr = []
for(var i = 0; i < 105; i++) {
    arr.push(i)
}

var l = 15;
var f = -29,
    c = -24;

var faceArea = "",
    chatText = ""

arr.forEach((val,index) => {
    var x = index%l,
        y = parseInt(index/l);

    faceArea += `.face${index} {background-position: ${x*f}px ${y*f}px;}`
})


arr.forEach((val,index) => {
    var x = index%l,
        y = parseInt(index/l);

    chatText += `.face${index} {background-position: ${x*c}px ${y*c}px;}`
})



// face-sprite.png
var arr = []
for(var i = 0; i < 105; i++) {
    arr.push(i)
}

var b = -28,
    s = -20;

var faceArea = "",
    chatText = ""

arr.forEach((val,index) => {
    faceArea += `.face${index} {background-position: 0 ${index*b}px;}`
})

arr.forEach((val,index) => {
    chatText += `.face${index} {background-position: 0 ${index*s}px;}`
})


// arr.forEach((val,index) => {
//     var x = index%l,
//         y = parseInt(index/l);

//     chatText += `.face${index} {background-position: ${x*c}px ${y*c}px;}`
// })