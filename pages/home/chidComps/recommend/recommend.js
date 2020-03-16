// pages/home/chidComps/recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoad:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImageLoad(){
      if (!this.data.isLoad){
        // console.log("recommend1张图片加载完成");
        this.data.isLoad=true
        this.triggerEvent("imageLoad")
        
      }
    }
  }
})