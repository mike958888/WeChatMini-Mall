import {request} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    goodsDetail:{}
  },
  GoodsInfo:[],
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id)
  },
  async getGoodsDetail(goods_id){
    const goodsDetail = await request({url:'/goods/detail',data:{goods_id}})
    this.GoodsInfo = goodsDetail
    // console.log(this.GoodsInfo);
    this.setData({
      goodsDetail:{
        goods_name:goodsDetail.goods_name,
        goods_price:goodsDetail.goods_price,
        pics:goodsDetail.pics,
        goods_introduce:goodsDetail.goods_introduce.replace(/\.wep/g,'.jpg')
      }
    })
  },
  imagePreview(e){
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    })
  },
  handleGoodsAdd(){
    // 获取缓存中的购物车  数组
    let cart = wx.getStorageSync('cart') || [];
    // 判断购物车是否存在该商品
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    // console.log(index);
    // 若不存在，第一次添加
    if(index=== -1){
      this.GoodsInfo.num =1;
      cart.push(this.GoodsInfo)
    }else{
       // 若存在，数据加
       cart[index].num++
       console.log(cart);
    }
    // 把购物车数据从新添加到缓存
    wx.setStorageSync('cart', cart)
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // 防抖
      mask:true,
    })
  }
})