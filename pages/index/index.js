//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    iosDialog1: false,
    inputShowed: false,
    inputVal: "",
    campus: ["所有","东院","西院","鉴湖","南湖","余区"],
    catarray: [{
      name: "空空"
    },{
      name: "点点"
    },{
      name: "馆长"
    },{
      name: "无名氏"
    },{
      name: "馆长"
    },{
      name: "无名氏"
    }],
    "name": "空",
    "sterilization": "未绝育",
    "deworming": "未驱虫",
    "vaccine": "无疫苗",
    "introduction": "话多",
    items: [
      {value: 'all', name: '总',checked: 'true'},
      {value: 'dong', name: '东'},
      {value: 'xi', name: '西'},
      {value: 'jian', name: '鉴'},
      {value: 'nan', name: '南'},
      {value: 'yu', name: '余'}
    ],
    bulletins: [{
      "text": "就这就这就这就这就这就这",
      "color": "rgb(53,53,53)"
    },{
      "text": "确实确实确实确实确实确实",
      "color": "rgb(9,187,7)" 
    },{
      "text": "有一说一有一说一有一说一有一说一",
      "color": "rgb(87,107,149)"
    }]
  },
  //事件处理函数
  showcat: function (e) {
    var catname = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../cat/cat?name='+catname,
    })
    // console.log(e.currentTarget.dataset.name)
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }

    this.setData({
      items
    })
  },
  onLoad() {
    this.setData({
        search: this.search.bind(this)
    })
  },
  search: function (value) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
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
          inputVal: e.detail.value
      });
  },
  close: function () {
    this.setData({
        iosDialog1: false,
        iosDialog2: false,
        androidDialog1: false,
        androidDialog2: false,
    })
},
openIOS1: function() {
    this.setData({
        iosDialog1: true
    });
},
openIOS2: function() {
    this.setData({
        iosDialog2: true
    });
},
openAndroid1: function() {
    this.setData({
        androidDialog1: true
    });
},
openAndroid2: function() {
    this.setData({
        androidDialog2: true
    });
},
})
