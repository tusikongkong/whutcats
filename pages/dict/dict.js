// dict.js
const app = getApp()

Page({
  data: {
    artist: ""
  },
  //事件处理函数
  onLoad:function(){
    wx.showLoading({
      title: '在写了...',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 700)
    var that = this
    wx.request({
      url: app.globalData.URL+'article',
      header: {
        'Accept':'application/x..v1+json'
      },
      success: function(res){
        that.setData({
          "artlist": res.data
        })
      }
    })
  }


})
