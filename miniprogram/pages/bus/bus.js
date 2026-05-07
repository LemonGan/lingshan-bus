// pages/bus/bus.js
const busData = require('../../utils/bus_data.js');

Page({
  data: {
    searchText: '',
    activeTab: 'all',
    lines: [],
    filteredLines: [],
    searchTimer: null
  },

  onLoad(options) {
    const type = options.type || 'all';
    this.setData({
      lines: busData.lines,
      filteredLines: busData.lines,
      activeTab: type
    });
    this.filterLines();
  },

  onShow() {
    if (typeof getApp !== 'undefined') {
      var app = getApp();
      if (app.globalData && app.globalData.busSearchKeyword) {
        var kw = app.globalData.busSearchKeyword;
        app.globalData.busSearchKeyword = '';
        this.setData({ searchText: kw, activeTab: 'all' });
        this.filterLines();
      }
      if (app.globalData && app.globalData.busFilterType) {
        var ft = app.globalData.busFilterType;
        app.globalData.busFilterType = '';
        this.setData({ activeTab: ft });
        this.filterLines();
      }
    }
  },

  onSearch(e) {
    const value = e.detail.value.trim();
    this.setData({ searchText: value });
    if (this.data.searchTimer) clearTimeout(this.data.searchTimer);
    this.data.searchTimer = setTimeout(() => { this.filterLines(); }, 300);
  },

  onClear() {
    this.setData({ searchText: '' });
    this.filterLines();
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    // 先清空列表（卸载 DOM），再设新数据触发入场动画重播
    this.setData({ activeTab: tab, filteredLines: [] });
    var _this = this;
    setTimeout(function() {
      _this.filterLines();
    }, 50);
  },

  filterLines() {
    const { lines, searchText, activeTab } = this.data;
    let filtered = lines;

    if (activeTab === 'urban') {
      filtered = filtered.filter(l => l.type === '城区');
    } else if (activeTab === 'rural') {
      filtered = filtered.filter(l => l.type === '城乡');
    }

    if (searchText) {
      filtered = filtered.filter(l => {
        return l.id.includes(searchText) ||
          l.start.includes(searchText) ||
          l.end.includes(searchText) ||
          l.stations.some(s => s.name.includes(searchText));
      });
    }

    this.setData({ filteredLines: filtered });
  },

  goDetail(e) {
    const line = e.currentTarget.dataset.line;
    wx.navigateTo({ url: `/pages/detail/detail?id=${line.id}` });
  },

  goIndex() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});
