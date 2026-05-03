// pages/bus/bus.js
const busData = require('../../utils/bus_data.js');

Page({
  data: {
    searchText: '',
    activeTab: 'all',
    lines: [],
    filteredLines: [],
    searchTimer: null,
    loading: false
  },

  onLoad(options) {
    const type = options.type || 'all';
    const keyword = options.keyword || '';
    this.setData({
      lines: busData.lines,
      filteredLines: busData.lines,
      activeTab: type,
      searchText: keyword ? decodeURIComponent(keyword) : ''
    });
    this.filterLines();
  },

  onSearch(e) {
    const value = e.detail.value.trim();
    this.setData({ searchText: value });
    // 防抖：300ms后执行搜索
    if (this.data.searchTimer) {
      clearTimeout(this.data.searchTimer);
    }
    this.data.searchTimer = setTimeout(() => {
      this.filterLines();
    }, 300);
  },

  onClear() {
    this.setData({ searchText: '' });
    this.filterLines();
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
    this.filterLines();
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
    wx.navigateTo({
      url: `/pages/detail/detail?id=${line.id}`
    });
  },

  goIndex() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});