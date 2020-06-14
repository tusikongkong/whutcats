//index.js
//获取应用实例
const app = getApp()

Page({
  mixins: [require('../../mixin/themeChanged')],
  data: {
    selectcampus: "",
    iosDialog1: false,
    inputShowed: false,
    inputVal: "",
    search: "",
    issearch: "",
    nextpage: "",
    nomore: true,
    campus: ["所有","东院","西院","鉴湖","南湖","余区"],
    catslist: "",
    bulletinlist: "",
    items: [
      {value: '', name: '总', checked: true},
      {value: '东院', name: '东', checked: false},
      {value: '西院', name: '西',checked: false},
      {value: '鉴湖', name: '鉴',checked: false},
      {value: '南湖', name: '南',checked: false},
      {value: '余区', name: '余',checked: false}
    ],
    isHideLoadMore: true,
  },
  //事件处理函数
  onPullDownRefresh: function () {
    this.onLoad(); //重新加载onLoad()
  },
  showcat: function (e) {
    var catname = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../cat/cat?name='+catname,
    })
    // console.log(e.currentTarget.dataset.name)
  },
  radioChange(e) {
    wx.showLoading({
      title: '加载'+e.detail.value+'猫咪中',
    })
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      "selectcampus": e.detail.value
    })
    var that = this
    wx.request({
      url: app.globalData.DOMAIN+'api/cats',
      data: {
        "campus": that.__data__.selectcampus
      },
      headers: {
        'Accept':'application/x..v1+json'
      },
      success: function(res){
        wx.hideLoading()
        that.setData({
          "catslist": res.data.data,
          "nextpage": res.data.meta.pagination.links.next
        })
      }
    })
  },
  onShareAppMessage:function(){
    return {
      title: '武理喵喵',
      path: 'pages/index/index',
      imageUrl: app.globalData.DOMAIN+'upload/images/indexpic.png',
      success: (res) => {
        // 分享成功
      },
      fail: (res) => {
        // 分享失败
      }
    }
  },
  onLoad() {
    wx.showShareMenu({
      withShareTicket: true
    })
    // console.log('停止下拉刷新')
    wx.stopPullDownRefresh()
    this.setData({
      search: this.search.bind(this)
    })
    wx.showLoading({
      title: '加载全体猫咪中',
    })
    var that=this;
    // console.log(that.__data__.selectcampus)
    wx.request({
      url: app.globalData.DOMAIN+'api/cats',
      data: {
        "campus": that.__data__.selectcampus
      },
      headers: {
        'Accept':'application/x..v1+json'
      },
      success: function(res){
        wx.hideLoading()
        that.setData({
          "catslist": res.data.data,
          "nextpage": res.data.meta.pagination.links.next
        })
        // console.log(res.data.data)
      }
    }),
    wx.request({
      url: app.globalData.DOMAIN+'api/bulletin',
      headers: {
        'Accept':'application/x..v1+json'
      },
      success: function(res){
        that.setData({
          "bulletinlist": res.data
        })
      }
    })
  },
  search: function (value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([{text: '结果', value: 1}, {text: '结果2', value: 2}])
        }, 200)
    })
  },
  selectResult: function (e) {
      console.log('select result', e.detail)
  },
  showInput: function () {
    this.setData({
        inputShowed: true
    });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  inputTyping: function (e) {
    this.setData({
      "inputVal": e.detail.value
    })
    var that = this
    // console.log(app.globalData.URL+'search?name='+e.detail.value)
    wx.request({
      url: app.globalData.DOMAIN+'api/search',
      data: {
        'name': e.detail.value
      },
      header: {
        'Accept':'application/x..v1+json'
      },
      success:function(res){
        // console.log(res.data == "")
        if(res.data == ""){
          that.setData({
            "search": {"name":"啊哦，暂未收录。联系客服提交猫咪详细信息吧~"},
            "issearch": "0"
          }) 
        }else{
          that.setData({
            "search": res.data[0],
            "issearch": "1"
          })
        }
        
      }
    })
  },
  close: function () {
    this.setData({
        iosDialog1: false
    })
  },
  openIOS1: function() {
    this.setData({
        iosDialog1: true
    });
  },
  // 触底加载更多
  onReachBottom:function(){
    // console.log('加载更多')
    this.setData({
      "isHideLoadMore": false,
      "nomore": true
    })
    var that = this
    
    wx.request({
      url: that.__data__.nextpage,
      data: {
        "campus": that.__data__.selectcampus
      },
      header: {
        'Accept': 'application/x..v1+json'
      },
      success:function(res){
        that.setData({
          "nextpage": res.data.meta.pagination.links.next,
          "isHideLoadMore": true
        })
        that.__data__.catslist = that.__data__.catslist.concat(res.data.data)
        
        that.setData({
          "catslist": that.__data__.catslist
        })

        if(res.data.data.length < 8){
          that.setData({
            "nomore": false
          })
        }
      },
      complete:function(){
        that.setData({
          "isHideLoadMore": true,
          "nomore": false
        })
      }
    })
  }
  // onPageScroll:function(e){
  //   console.log(e.scrollTop)
  // }
})
