import {
  getDetail,
  getRecommends,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo,
} from "../../service/detail"
import {
  BACK_TOP_POSITION
} from '../../common/const.js'
const app = getApp()

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: '',
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: {},
    showBackTop: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.获取传入的id
    this.setData({
      iid: options.iid
    })
    this._getDetailData()
    this._getRecommends()
  },
  /* 获取详情页基本数据 */
  _getDetailData() {
    getDetail(this.data.iid).then(res => {
      // console.log(res);
      const data = res.result;
      // console.log(res.result);
      // 1.取出顶部的轮播图片
      const topImages = data.itemInfo.topImages
      // 2.创建BaseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // console.log(baseInfo);
      // 3.创建ShopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo);
      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo;
      // 5.创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)
      // 6.获取评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }

      this.setData({
        topImages: topImages,
        baseInfo: baseInfo,
        shopInfo: shopInfo,
        detailInfo: detailInfo,
        paramInfo: paramInfo,
        commentInfo: commentInfo
      })
    })
  },
  /* 获取详情页推荐数据 */
  _getRecommends() {
    getRecommends().then(res => {
      // console.log(res.data.list);

      this.setData({
        recommends: res.data.list
      })

    })
  },
  onPageScroll(option) {

    /* backTop按钮的显示和隐藏 */
    // console.log(option);
    //1.取出scrollTop
    const scrollTop = option.scrollTop
    // 2.修改showBackTop属性
    // 不要频繁在滚动回调中频繁调用this.setData
    // console.log(scrollTop);

    const flag1 = scrollTop >= BACK_TOP_POSITION
    if (flag1 != this.data.showBackTop) {
      this.setData({
        showBackTop: flag1
        // console.log("111");
      })
    }
  },
  onAddCart() {
    // 1.获取购物车需要展示的商品的信息
    // console.log("====");
    
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;
    // 2.加入购物车
    app.addToCart(obj)
    console.log("detail");
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

  }
})