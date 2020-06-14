// dict.js
const app = getApp()

Page({
  data: {
    artist: ""
  },
  //事件处理函数
  onPullDownRefresh: function () {
    this.onLoad(); //重新加载onLoad()
  },
  onShareAppMessage:function(){
    return {
      title: '猫咪小课堂',
      path: 'pages/dict/dict',
      imageUrl: app.globalData.DOMAIN+'upload/images/dictpic.png',
      success: (res) => {
        // 分享成功
      },
      fail: (res) => {
        // 分享失败
      }
    }
  },
  onLoad:function(){
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.stopPullDownRefresh()
    wx.showLoading({
      title: '加载中...',
    })

    var that = this
    wx.request({
      url: app.globalData.DOMAIN+'api/article',
      header: {
        'Accept':'application/x..v1+json'
      },
      success: function(res){
        wx.hideLoading()
        that.setData({
          "artlist": res.data
        })
      }
    })
  }


})
