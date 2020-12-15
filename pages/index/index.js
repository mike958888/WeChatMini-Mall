import {request} from '../../request/index'

Page({
  data: {
    // 轮播图数据
    swiperList:[],
    cateList:[],
    floorList:[]
  },
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: (res)=>{
    //   //  console.log(res);
    //   this.setData({
    //     swiperList:res.data.message
    //   })
    //   },
    // })
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  getSwiperList(){
    request({url:"/home/swiperdata"})
      .then(res=>{
        this.setData({
          swiperList:res
        })
      })
  },
  getCateList(){
    request({url:"/home/catitems"})
      .then(res=>{
        // console.log(res);
        this.setData({
          cateList:res
        })
      })
  },
  getFloorList(){
    request({url:"/home/floordata"})
      .then(res=>{
        this.setData({
          floorList:res
        })
        // console.log(res);
      })
      .catch(err=>{
        console.log(err);
      })
  }
})
