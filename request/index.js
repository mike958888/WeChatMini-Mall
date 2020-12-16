let ajaxTimes = 0
export const request=(params)=>{
    ajaxTimes ++
    wx.showLoading({
        title: '加载中',
        mask:true
      })
    // 定义公共的接口
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success: (result)=>{
                resolve(result.data.message)
            },
            fail: (err) =>{
                reject(err)
            },
            complete: function() {
                ajaxTimes--;
                if(ajaxTimes===0){
                    wx.hideLoading()
                }
            }
        })
    })
}