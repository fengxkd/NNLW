// miniprogram/ipages/index/index.js

var list = [];
var MAXLIMT = 20;
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mesaageList:[],
    admin_message:"hello",
    admin_video:"cloud://nndlw-7580d5.6e6e-nndlw-7580d5/NNDLW/王者1.mp4",
    curIndex:0,
    hiddenOrNot:false,
  },
  // 预览图片
  previewImg: function (event) {
    var mUrl = "";
    if (event.currentTarget.dataset.url)
      mUrl = event.currentTarget.dataset.url;
    wx.previewImage({
      current: mUrl,
      urls: [mUrl]
    })
  },
  onItemClick: function (event) {
    var targetUrl = "/ipages/public/public";
    if (event.currentTarget.dataset.url != null)
      targetUrl = targetUrl + "?url=" + event.currentTarget.dataset.url;
    wx.navigateTo({
      url: targetUrl
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    wx.cloud.init();
    const db = wx.cloud.database();
    //管理员广播通知
    db.collection('LLDLW').doc('XBO0RnkPDdDCJ2cS').get({
      success: function (res) {
        // res.data 包含该记录的数据
        console.log(res.data.display);
        that.setData({
          admin_message: res.data.message,
          admin_source: res.data.source,
          hiddenOrNot: res.data.display,

        });
        console.log(admin_message);
      }
    });
    // db.collection('LLDLW').doc('XBO6XlsqTi00tkiT').get({
    //   success: function (res) {
    //     // res.data 包含该记录的数据
    //     console.log(res.data.source);
    //     that.setData({
    //       admin_source: res.data.source,
    //     });
    //     console.log(admin_source);
    //   }
    // });

    // //数据获取
    // db.collection('Comments').orderBy('dataTime', 'desc').get().then(res => {
    //   // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
    //   // var list =[]
    //   console.log(res)
    //   res.data.forEach(function (item) {
    //     list.push(
    //       {
    //         userAvatarUrl: item.userAvatarUrl,
    //         userNickName: item.userNickName,
    //         dataTime: item.dataTime,
    //         content: item.content,
    //         img_url: item.img_src,
    //         zan_count: item.zan_count,
    //         common_count: item.common_count
    //       })
    //   })
    //   console.log(list)
    //   that.setData({
    //     messageList: list
    //   })
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  
  inputValue: '',
  bindInputBlur(e) {
    this.inputValue = e.detail.value
  },
  bindSendDanmu() {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })

    wx.cloud.init();
    const db = wx.cloud.database();
    const _ = db.command
    db.collection('todos').doc('W55p3rOVH2exDS3Y').update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        info: text
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /*
    var that = this;
    list = [];
    wx.cloud.init();
    const db = wx.cloud.database();
    //数据获取
    db.collection('Comments').orderBy('dataTime', 'desc').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      // var list =[]
      console.log(res)
      res.data.forEach(function (item) {
        list.push(
          {
            userAvatarUrl: item.userAvatarUrl,
            userNickName: item.userNickName,
            dataTime: item.dataTime,
            content: item.content,
            img_url: item.img_src,
            zan_count: item.zan_count,
            common_count: item.common_count
          })
      })
      console.log(list)
      that.setData({
        messageList: list
      })
    })*/
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    list = [];
    wx.cloud.init();
    const db = wx.cloud.database();
    //数据获取
    db.collection('Comments').orderBy('dataTime', 'desc').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      // var list =[]
      console.log(res)
      res.data.forEach(function (item) {
        list.push(
          {
            userAvatarUrl: item.userAvatarUrl,
            userNickName: item.userNickName,
            dataTime: item.dataTime,
            content: item.content,
            img_url: item.img_src,
            zan_count: item.zan_count,
            common_count: item.common_count
          })
      })
      console.log(list)
      that.setData({
        messageList: list
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;

    var index = this.data.curIndex + MAXLIMT;

    wx.cloud.init();
    const db = wx.cloud.database();
    //数据获取
    db.collection('Comments').orderBy('dataTime', 'desc').skip(index).get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      // var list =[]
      console.log(res)
      res.data.forEach(function (item) {
        list.push(
          {
            userAvatarUrl: item.userAvatarUrl,
            userNickName: item.userNickName,
            dataTime: item.dataTime,
            content: item.content,
            img_url: item.img_src,
            zan_count: item.zan_count,
            common_count: item.common_count
          })
      })
      console.log(list)
      that.setData({
        messageList: list
      })
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})
