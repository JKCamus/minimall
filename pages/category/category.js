// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../service/category.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categoryData: {},
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getData()
  },
  /* ------------网络请求相关----------------- */
  _getData() {
    this._getCategory()
  },
  _getCategory() {
    getCategory().then(res => {
      // console.log(res);

      const categories = res.data.category.list

      const categoryData = {}
      for (let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
        }
      }
      this.setData({
        categories: res.data.category.list,
        categoryData: categoryData
      })
      // console.log(categoryData);
      this._getSubcategory(0)
      this._getCategoryDetail(0)
      // console.log(this._getSubcategory(0));
      // console.log(categoryData);

    })
  },
  _getSubcategory(currentIndex) {
    const maitKey = this.data.categories[currentIndex].maitKey

    getSubcategory(maitKey).then(res => {
      const tempCategoryData = this.data.categoryData
      tempCategoryData[currentIndex].subcategories = res.data.list
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex) {
    const miniWallKey = this.data.categories[currentIndex].miniWallkey
    this._getRealCategoryDetail(currentIndex, miniWallKey, 'pop')
  },
  _getRealCategoryDetail(index, miniWallKey, type) {
    getCategoryDetail(miniWallKey, type).then(res => {
      // console.log(res);
      const categoryData = this.data.categoryData
      categoryData[index].categoryDetail = res
      this.setData({
        categoryData: categoryData
      })
    })
  },
  menuClick(event) {
    const currentIndex = event.detail.currentIndex
    this.setData({
      currentIndex
    })
    this._getSubcategory(currentIndex)
    this._getCategoryDetail(currentIndex)
  }

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

})