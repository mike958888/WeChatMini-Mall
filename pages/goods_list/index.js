import {request} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  data: {
    tabs:[{
      id:0,
      value:"综合",
      isActive:true
    },{
      id:1,
      value:"销量",
      isActive:false
    },{
      id:2,
      value:"价格",
      isActive:false
    }],
    goodsList:[]
  },
  // 总页数
  totalPages:1,
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  onLoad:  function(options) {
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams})
    console.log(res);
    // 获取总条数
    const total = res.total
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    // console.log(this.totalPages);
    this.setData({
      // 解构赋值 
      // this.data.goodsList 为上一页的数据
      // res.goods 
      goodsList:[...this.data.goodsList,...res.goods]
    })
  },
  // 标题子组件
  ItemChange(e){
    const {index} = e.detail;
    const {tabs} = this.data;
    tabs.forEach((v,i)=>i===index ? v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  },
  // 页面上滑，触底事件
  onReachBottom(){
    // 判断还有没有下一页
    if(this.QueryParams.pagenum >= this.totalPages){
      // 没有下一页
      // console.log("见底了，数据见底了");
      wx.showToast({title:"没有更多数据啦"})
    }else{
      // console.log("还有数据需要更新");
      // 请求后的数据应添加到原来的data中，而不是覆盖 
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  }
})