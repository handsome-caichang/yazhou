
Page({
  data: {
    mallURL: "https://mall.xiaogj.com/test/html/index.html",
  },
  onLoad: function () {
    console.log(this)

    wx.showModal({
      title: "mall页面对象",
      content: JSON.stringify(this)
    })

    if (this.options.webView) {
      console.log(this.options)
      var url = `${this.options.webView}#${this.options.hash}`
      console.log(url)

      wx.showModal({
        title: "mall 分享",
        content: url
      })
      
      this.setData({
        mallURL: url
      })
    }
  },
  onShareAppMessage: function (options) {
      console.log(options)

      // var url = encodeURI(options.webViewUrl)
      var url = options.webViewUrl
      var uarr = url.split("#")

      wx.showModal({
        title: "实时URL",
        content: options.webViewUrl
      })

    return {
      title: '商城',
      path: `pages/mall/mall?webView=${uarr[0]}&hash=${uarr[1]}`,
      success: function (res,abc) {
        console.log(options)
        console.log(res)
        console.log(abc)
      }
    }
  }
})
