// index.js
Page({
  data: {
    hotLines: [
      { id: 1, number: '1路', name: '灵山汽车站 - 人民医院' },
      { id: 2, number: '2路', name: '广场 - 县政府' },
      { id: 3, number: '3路', name: '火车站 - 百货大楼' },
      { id: 4, number: '5路', name: '汽车站 - 光大广场' }
    ]
  },
  
  onSearchInput(e) {
    const value = e.detail.value
    // TODO: 搜索线路
  },
  
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  }
})