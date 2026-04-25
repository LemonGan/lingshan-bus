// list.js
Page({
  data: {
    lines: [
      // 县城城区公交 (2元)
      { id: 101, number: '101路', name: '鹏大汽车城 — 园丰牧业', firstBus: '06:40', lastBus: '18:00', type: '城区', price: '2元' },
      { id: 102, number: '102路', name: '汽车南站 — 洲塘村', firstBus: '08:00', lastBus: '23:30', type: '城区', price: '2元' },
      { id: 103, number: '103路', name: '县城循环线路', firstBus: '', lastBus: '', type: '城区', price: '2元' },
      { id: 105, number: '105路', name: '城区环线公交', firstBus: '', lastBus: '', type: '城区', price: '2元' },
      { id: 106, number: '106路', name: '大琴垌小学 — 华源大厦', firstBus: '08:00', lastBus: '23:30', type: '城区', price: '2元' },
      { id: 108, number: '108路', name: '城区便民短线', firstBus: '', lastBus: '', type: '城区', price: '2元' },
      { id: 208, number: '208路', name: '平山街 — 中医院', firstBus: '07:00', lastBus: '18:00', type: '城区', price: '2元' },
      { id: 210, number: '210路', name: '城区短途接驳线', firstBus: '', lastBus: '', type: '城区', price: '2元' },
      { id: 3, number: '3路', name: '建材市场 — 灵山职校', firstBus: '', lastBus: '', type: '城区', price: '2元' },
      // 城乡乡镇公交
      { id: 502, number: '502路', name: '园丰牧业 — 太平镇', firstBus: '06:30', lastBus: '18:10', type: '城乡', price: '2-19.9元' },
      { id: 802, number: '802路', name: '汽车总站 — 石塘镇', firstBus: '06:00', lastBus: '18:30', type: '城乡', price: '2-8元' },
      { id: 805, number: '805路', name: '华屏村 — 交通局', firstBus: '', lastBus: '', type: '城乡', price: '分段' },
      { id: 809, number: '809路', name: '县城衔接周边近郊乡镇', firstBus: '', lastBus: '', type: '城乡', price: '分段' },
      { id: 8011, number: '8011路', name: '六峰步行街 — 那隆街', firstBus: '06:20', lastBus: '19:30', type: '城乡', price: '2-5元' },
      { id: 8018, number: '8018路', name: '二医院 — 大平', firstBus: '', lastBus: '', type: '城乡', price: '分段' },
      { id: 8028, number: '8028路', name: '聚龙湾 — 陆屋客运站', firstBus: '06:30', lastBus: '18:30', type: '城乡', price: '分段' },
      { id: 8026, number: '8026路', name: '县城至西南乡镇接驳', firstBus: '', lastBus: '', type: '城乡', price: '分段' },
      // 跨县公交
      { id: 8022, number: '8022路', name: '灵山聚龙湾 — 浦北汽车总站', firstBus: '07:00', lastBus: '17:30', type: '跨县', price: '分段' },
      // 乡镇专线
      { id: 1001, number: '灵山1路', name: '城郊便民线路', firstBus: '', lastBus: '', type: '城乡', price: '分段' },
      { id: 1002, number: '灵山2路', name: '茶亭村委 — 二医院', firstBus: '', lastBus: '', type: '城乡', price: '分段' },
      { id: 1007, number: '灵山7路', name: '新院村委 — 二医院', firstBus: '', lastBus: '', type: '城乡', price: '分段' }
    ]
  },
  
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id })
  }
})