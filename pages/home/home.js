// pages/home/home.js
import {
  getMultiData,
  getGoods
} from '../../service/home.js'
import {
  POP,
  SELL,
  NEW,
  BACK_TOP_POSITION
} from '../../common/const.js'

const types = [POP, NEW, SELL]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ["流行", "新款", "精选"],
    goods: {
      [POP]: {
        page: 1,
        list: []
      },
      [NEW]: {
        page: 1,
        list: []
      },
      [SELL]: {
        page: 1,
        list: []
      }
    },
    currentType: 'pop',
    showBackTop: false,
    showTabControl: false,
    tabControlTop: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取轮播图以及推荐数据
    this._getMultiData()
    this._getGoods(POP)
    this._getGoods(NEW)
    this._getGoods(SELL)
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
  tabClick(event) {
    // console.log(event);
    // 取出index
    const index = event.detail.index
    // console.log(index);
    // 设置currentType
    // 与设置的types一对一
    this.setData({
      currentType: types[index]
    })
    // console.log(event);
    console.log(this.selectComponent('.tab-control-temp'));
    console.log(this.selectComponent('.tab-control'));

    // this.selectComponent('.tab-control').setCurrentIndex(index)
    this.selectComponent('.tab-control').setCurrentIndex(index)
    this.selectComponent('.tab-control-temp').setCurrentIndex(index)

    
  },
  // 到达底部，上拉加载更多，wx原装方法
  onReachBottom() {
    console.log("底部");
    // 上拉加载更多
    this._getGoods(this.data.currentType)
  },
  onBackTop() {

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
    // 根据tabcontrol的位置修改showTabControl的属性，隐藏的tabControl的显隐性
    const flag2 = scrollTop >= this.data.tabControlTop
    if (flag2 != this.data.showTabControl) {
      this.setData({
        showTabControl: flag2
      })
    }
  },
  onImageLoad() {
    console.log("图片加载完成");
    /* ------------自定义组件。#tab-control节点选择器，exec()为调用一次，返回对象实例，top（选择节点的上边界坐标）----------------- */
    wx.createSelectorQuery().select('.tab-control').boundingClientRect(rect => {
      // console.log(rect);
      // this.data.tabControlTop = rect.top
      this.setData({
        tabControlTop: rect.top
      })
    }).exec();
  },

  /* ----------请求数据相关----------- */
  /* 请求swiper数据 */
  _getMultiData() {
    getMultiData().then(res => {
      // console.log(res);
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      //将banners和recommends存入data中
      this.setData({
        banners,
        recommends
      })
    })
  },
  /* 请求goods数据获*/
  _getGoods(type) {
    // 1.获取数据对应的页码
    const page = this.data.goods[type].page;

    // 2.请求数据
    getGoods(type, page).then(res => {
      // 1.取出数据
      const list = res.data.data.list;
      // console.log(res);

      // 2.将数据临时获取
      const goods = this.data.goods;
      goods[type].list.push(...list)
      goods[type].page += 1;

      // 3.最新的goods设置到goods中
      this.setData({
        goods: goods
      })
    })
  },
})