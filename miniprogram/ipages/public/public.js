// miniprogram/ipages/public/public.js
var util = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    g_sImg:[],
    g_sMsg:"",
    imgID:[] //云端图片ID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 预览图片
  previewImg: function () {
    wx.previewImage({
      current: this.data.imgUrl,
      urls: [this.data.imgUrl]
    })
  },
  // 上传图片接口
  chooseImg: function () {
    var that = this
    // 选择图片
    wx.chooseImage({
       count: 1,
       sizeType: ['original', 'compressed'],
       sourceType: ['album', 'camera'],
       success: function (res) {
        //util.showBusy('正在上传');

        //console.log(res);
        var imgPaths= [];
         res.tempFilePaths.forEach(function (i) {
              // console.log(i)
              // var filePath1 =i;
              // var arr1 = filePath1.trim().split('/');
              // var arr = arr1[arr1.length - 1].split('.');
              // var cPath = 'gyjy/' + arr[arr.length - 2] + '.' + arr[arr.length - 1]
              // imgPaths.push({url:cPath});
              imgPaths.push(i);
         })
        //console.log(imgPaths); 
        that.setData({
          g_sImg: imgPaths,
          imgID: res.tempFilePaths
          });
       },
       fail: function (e) {
         console.error(e)
       }
    })
  },
  formSubmit:function(e)
  {
    //console.log(e)
    this.setData({
      g_sMsg:e.detail.value.textarea
    })

    // var imgPaths = [];
    // var filePath = [];
    // this.data.g_sImg.forEach(function (i) {
    //   // console.log(i)
    //   filePath.push(i);
    //   var arr1 = i.trim().split('/');
    //   var arr = arr1[arr1.length - 1].split('.');
    //   var cPath = 'gyjy/' + arr[arr.length - 2] + '.' + arr[arr.length - 1]
    //   imgPaths.push(cPath );
    // })
    // console.log(imgPaths)
    // console.log(filePath)

    // if (imgPaths[0])
    // {
    //   wx.cloud.uploadFile({
    //     cloudPath: imgPaths[0],
    //     filePath: filePath[0], // 小程序临时文件路径
    //   }).then(res => {
    //     console.log("上传成功！")
    //   }).catch(error => { console.log(error) })

    // }

    //将数据添加到数据库
    // if (e.detail.value.textarea || imgPaths[0])
    // {
    //   console.log(this.data.g_suserAvataUrl);
    //   const db = wx.cloud.database();
    //   db.collection('Comments').add({
    //     data: {
    //       comment_count: 0,
    //       content: e.detail.value.textarea,
    //       dataTime: util.formatTime(new Date),
    //       img_src: 'cloud://gyjy-666.6779-gyjy-666/' + imgPaths[0],
    //       zan_count: 0,
    //       userAvataUrl: this.data.g_suserAvataUrl,
    //       userNickName: this.data.g_suserNickName
    //     },
    //   }).then(res => {
    //     util.showSuccess('发表成功！')
    //     console.log(res)
    //   })
    // }

  },
  onGetUserInfo: function (e) {
    var that = this;
    // console.log(e)

    var imgPaths = [];
    var filePath = [];
    this.data.g_sImg.forEach(function (i) {
      // console.log(i)
      filePath.push(i);
      var arr1 = i.trim().split('/');
      var arr = arr1[arr1.length - 1].split('.');
      var cPath = 'gyjy/' + arr[arr.length - 2] + '.' + arr[arr.length - 1]
      imgPaths.push(cPath );
    })
    if (e.detail.userInfo) {

      if (imgPaths[0]) {
        wx.cloud.uploadFile({
          cloudPath: imgPaths[0],
          filePath: filePath[0], // 小程序临时文件路径
        }).then(res => {
          console.log("上传成功！")
        }).catch(error => { console.log(error) })

      }

      //将数据添加到数据库
      
      if (this.data.g_sMsg || imgPaths[0]) {
        console.log(e.detail.userInfo);
        const db = wx.cloud.database();
        db.collection('Comments').add({
          data: {
            common_count: 0,
            content: this.data.g_sMsg,
            dataTime: util.formatTime(new Date),
            img_src: 'cloud://gyjy-666.6779-gyjy-666/' + imgPaths[0],
            zan_count: 0,
            userAvatarUrl: e.detail.userInfo.avatarUrl,
            userNickName: e.detail.userInfo.nickName
          },
        }).then(res => {
          util.showSuccess('发表成功！')
          console.log(res)
          wx.navigateBack({
            delta: 1
          })
        })
      }
    }
  }

})