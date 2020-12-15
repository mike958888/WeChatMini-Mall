import {request} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  data: {
    leftMenu:[],
    rightContent:[],
    currentIndex:0,
    scrollTop:0
  },
  Cates:[],
  onLoad: function (options) {
    // this.getCates()
    const Cates = wx.getStorageSync('cates')
    if(!Cates){
      this.getCates()
    }else{
      if(Date.now() - Cates.time > 10000){
        // console.log("重新发送");
        this.getCates()
      }else{
        // console.log("旧数据");
        this.Cates = Cates.data
        let leftMenu = this.Cates.map(v=>v.cat_name)
        let rightContent = this.Cates[index].children
        this.setData({
          currentIndex:index,
          rightContent,
          leftMenu
        })
      }
    }
  },
  // getCates(){
  //   request({url:'/categories'})
  //     .then(res=>{
  //       this.Cates = res.data.message

  //       // 把接口获取的数据存储在本地 storage 中 
  //       wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})

  //       // 构造左侧的大菜单栏
  //       let leftMenu = this.Cates.map(v=>v.cat_name)
  //       // 构造右侧的商品数据
  //       let rightContent = this.Cates[0].children;
  //       this.setData({
  //         leftMenu,rightContent
  //       })
  //     })
  // },

  async getCates(){
    const res = await request({url:'/categories'})
    this.Cates = res
        // 把接口获取的数据存储在本地 storage 中 
        wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
        // 构造左侧的大菜单栏
        let leftMenu = this.Cates.map(v=>v.cat_name)
        // 构造右侧的商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenu,rightContent
        })
  },
  handleItemTap(e){
    // console.log(e);
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })
  }
})