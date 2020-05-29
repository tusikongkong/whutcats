// cat.js

Page({
  data: {
    "catname": "",
    details: {
      "name": "空空",
      "avatar": "../../images/about_active.png",
      "introduction": "多少沾点nt多少沾点nt多少沾点nt多少沾点nt多少沾点nt多少沾点nt多少沾点nt多少沾点nt多少沾点nt多少沾点nt多少沾点nt",
      "pic": "../../images/kong.jpg",
      "sex": "girl",
      others: [{
        "up": "性格",
        "down": "暴躁得一批"
      },{
        "up": "绝育情况",
        "down": "未绝育"
      },{
        "up": "疫苗情况",
        "down": "未接种过疫苗"
      },{
        "up": "毛色",
        "down": "大橘为重"
      }]
    }
  },
  //事件处理函数
  onLoad:function(option){
    // console.log(option.name)
    this.setData({
      "catname": option.name
    })
  }

  
})
