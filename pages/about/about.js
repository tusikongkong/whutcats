//about.js
const app = getApp()

Page({
  data: {
    abouts: "",
    contacts: "",
    "avatar": "../../images/about_active.png"
  },
  //事件处理函数
  onPullDownRefresh: function () {
    this.onLoad(); //重新加载onLoad()
  },
  copy:function(e){
    var message = e.currentTarget.dataset.message;
    wx.setClipboardData({
      data: message,
      success (res) {
        wx.getClipboardData({
          success (res) {
            wx.showToast({
              title: '复制成功',
            })

          }
        })
      }
    })
  },
  onShareAppMessage:function(){
    return {
      title: '关于作者',
      path: 'pages/about/about',
      imageUrl: app.globalData.DOMAIN+'upload/images/mypic.png',
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
      title: '稍等一下...',
    })

    var that = this
    wx.request({
      url: app.globalData.DOMAIN+'api/about',
      header: {
        'Accept': 'application/x..v1+json'
      },
      success:function(res){
        wx.hideLoading()
        that.setData({
          "abouts": res.data[0]
        })
      }
    })
    wx.request({
      url: app.globalData.DOMAIN+'api/contact',
      header: {
        'Accept': 'application/x..v1+json'
      },
      success:function(res){
        // console.log(res.data.data)
        that.setData({
          "contacts": res.data.data
        })
      }
    })
  }
})
