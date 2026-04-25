// list.js
Page({
  data: {
    lines: [
      { id: 1, number: '1路', name: '灵山汽车站 - 人民医院', firstBus: '06:00', lastBus: '21:30' },
      { id: 2, number: '2路', name: '广场 - 县政府', firstBus: '06:30', lastBus: '21:00' },
      { id: 3, number: '3路', name: '火车站 - 百货大楼', firstBus: '06:00', lastBus: '20:30' },
      { id: 5, number: '5路', name: '汽车站 - 光大广场', firstBus: '06:00', lastBus: '21:00' },
      { id: 6, number: '6路', name: '人民医院 - 灵山中学', firstBus: '06:30', lastBus: '20:00' },
      { id: 7, number: '7路', name: '县政府 - 火车站', firstBus: '07:00', lastBus: '19:30' }
    ]
  },
  
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  }
})