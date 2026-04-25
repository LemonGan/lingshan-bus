// index.js
Page({
  data: {
    hotLines: [
      { id: 101, number: '101路', name: '鹏大汽车城 — 园丰牧业', firstBus: '06:40', lastBus: '18:00' },
      { id: 102, number: '102路', name: '汽车南站 — 洲塘村', firstBus: '08:00', lastBus: '23:30' },
      { id: 106, number: '106路', name: '大琴垌小学 — 华源大厦', firstBus: '08:00', lastBus: '23:30' },
      { id: 208, number: '208路', name: '平山街 — 中医院', firstBus: '07:00', lastBus: '18:00' }
    ]
  },
  
  onSearchInput(e) {
    const value = e.detail.value
    if (value) {
      wx.navigateTo({ url: '/pages/list/list?keyword=' + value })
    }
  },
  
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id })
  },
  
  goToList(e) {
    wx.switchTab({ url: '/pages/list/list' })
  }
})