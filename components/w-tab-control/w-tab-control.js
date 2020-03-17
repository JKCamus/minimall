// components/w-tab-control/w-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: []
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
    itemClick(event) {
      // 修改currentIndex
      // console.log("===");

      this.setData({
        // 取出index
        currentIndex: event.currentTarget.dataset.index
      })
      const data = {
        index: this.data.currentIndex
      }
      // 发出自定义事件
      this.triggerEvent("tabClick", data, {})
    },
    setCurrentIndex(index) {
      // console.log(index);
      this.setData({
        currentIndex: index
      })
    }
  }
})