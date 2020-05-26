//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  //事件处理函数
  gotodict: function() {
    wx.navigateTo({
      url: '../dict/dict'
    })
  },
})
