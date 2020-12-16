import {request} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    goodsDetail:{}
  },
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id)
  },
  async getGoodsDetail(goods_id){
    const goodsDetail = await request({url:'/goods/detail',data:{goods_id}})
    this.setData({
      goodsDetail:{
        goods_name:goodsDetail.goods_name,
        goods_price:goodsDetail.goods_price,
        pics:goodsDetail.pics,
        goods_introduce:goodsDetail.goods_introduce.replace(/\.wep/g,'.jpg')
      }
    })
  }
})