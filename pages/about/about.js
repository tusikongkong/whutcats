//about.js
const app = getApp()

Page({
  data: {
    abouts: "",
    contacts: "",
    "avatar": "../../images/about_active.png"
  },
  //事件处理函数
  copy:function(e){
    var message = e.currentTarget.dataset.message;
    wx.setClipboardData({
      data: message,
      success (res) {
        wx.getClipboardData({
          success (res) {
            wx.showToast({
              title: 'GET~粘贴看看',
            })

          }
        })
      }
    })
  },
  onLoad:function(){
    wx.showLoading({
      title: '你好呀...',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 700)
    var that = this
    wx.request({
      url: app.globalData.URL+'about',
      header: {
        'Accept': 'application/x..v1+json'
      },
      success:function(res){
        that.setData({
          "abouts": res.data[0]
        })
      }
    })
    wx.request({
      url: app.globalData.URL+'contact',
      header: {
        'Accept': 'application/x..v1+json'
      },
      success:function(res){
        console.log(res.data.data)
        that.setData({
          "contacts": res.data.data
        })
      }
    })
  }
})
