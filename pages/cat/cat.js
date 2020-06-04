// cat.js
const app = getApp();
Page({
  data: {
    "catindex": "",
    "message": "",
    "pic": "../../images/kong.jpg",
    "avatar": "../../images/cat_active.png",
    "sex": "",
    "issex": ""
  },
  //事件处理函数
  onLoad:function(option){
    // console.log(option.name)
    wx.showLoading({
      title: '稍等一小会儿',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 700)
    this.setData({
      "catindex": option.name
    })
    var that = this
    wx.request({
      url: app.globalData.URL+'cat/'+this.data.catindex,
      headers: {
        'Accept':'application/x..v1+json'
      },
      success: function(res){
        // console.log(res.data[0])
        const promise = new Promise((resolve,reject)=>{
          that.setData({
            "message": res.data.data
          })
          resolve();
        })
        promise.then(function(value){
          // console.log(that.__data__.message.sex)
          if(that.__data__.message.sex == '男'){
             that.setData({
              "sex": "../../images/boy.png",
              "issex": "1"
            })
          }else if(that.__data__.message.sex == '女'){
            that.setData({
              "sex": "../../images/girl.png",
              "issex": "1"
            })
          }else{
            that.setData({
              "issex": "0"
            })
          }
        })
      }
    })
    
    
    
    // wx.request({
    //   url: app.globalData.URL+'cat/'+this.data.catindex,
    //   headers: {
    //     'Accept':'application/x..v1+json'
    //   },
    //   success: function(res){
    //     // console.log(res.data[0])
    //     that.setData({
    //       "message": res.data[0]
    //     })
    //   }
    // })
  },

})
