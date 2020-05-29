//about.js

Page({
  data: {
    myavatar: "../../images/about_active.png",
    mymessage: [{
      "title": "mail",
      "content": "dithyrambuskong@gmail.com",
      "src": "../../images/mail.png"
    },{
      "title": "邮箱",
      "content": "马房山校区东院",
      "src": "../../images/address.png"
    }],
    wanttosay: "阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴"
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
  }
})
