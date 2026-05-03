// index.js
const busData = require('../../utils/bus_data.js');

Page({
  data: {
    hotLines: [],
    urbanLines: [],
    ruralLines: [],
    searchText: '',
    searchTimer: null
  },

  onLoad() {
    const lines = busData.lines;
    this.setData({
      hotLines: lines.slice(0, 4),
      urbanLines: lines.filter(l => l.type === '城区').slice(0, 3),
      ruralLines: lines.filter(l => l.type === '城乡').slice(0, 3)
    });
  },

  onSearchInput(e) {
    const value = e.detail.value;
    this.setData({ searchText: value });
    
    // 防抖：300ms后执行搜索
    if (this.data.searchTimer) {
      clearTimeout(this.data.searchTimer);
    }
    this.data.searchTimer = setTimeout(() => {
      if (value.trim()) {
        // Tab页传参，用全局变量
        var app = getApp();
        if (app.globalData) {
          app.globalData.busSearchKeyword = value.trim();
        }
        wx.switchTab({ url: '/pages/bus/bus' });
      }
    }, 300);
  },

  onSearch(e) {
    const value = e.detail.value || this.data.searchText;
    if (value.trim()) {
      var app = getApp();
      if (app.globalData) {
        app.globalData.busSearchKeyword = value.trim();
      }
      wx.switchTab({ url: '/pages/bus/bus' });
    }
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id });
  },

  goToList(e) {
    const type = e.currentTarget.dataset.type;
    var app = getApp();
    if (app.globalData) {
      app.globalData.busFilterType = type === '城区' ? 'urban' : 'rural';
    }
    wx.switchTab({ url: '/pages/bus/bus' });
  },

  goToBus() {
    wx.switchTab({ url: '/pages/bus/bus' });
  }
});