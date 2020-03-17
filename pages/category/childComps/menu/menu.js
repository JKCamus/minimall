// pages/category/menu/menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories: {
      type: Array,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemClick(event) {
      const currentIndex = event.currentTarget.dataset.index
      this.setData({
        currentIndex
      })
      this.triggerEvent('menuClick', {
        currentIndex
      }, {})
    },
  }
})