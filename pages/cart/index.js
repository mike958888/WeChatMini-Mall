
Page({
  data: {

  },
  onLoad: function (options) {

  },
  handleChooseAddress(){
    wx.chooseAddress({
      success: (result) => {
        console.log(result)
      },
      fail: () => {},
      complete: () => {}
    });
  }

})