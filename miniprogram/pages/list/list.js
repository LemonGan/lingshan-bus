// list.js
const busData = require('../../utils/bus_data.js');

Page({
  data: {
    lines: [],
    filteredLines: [],
    keyword: '',
    activeTab: 'all'
  },

  onLoad(options) {
    const keyword = options.keyword || '';
    this.setData({
      keyword: keyword,
      lines: busData.lines,
      filteredLines: busData.lines
    });
    
    if (keyword) {
      this.search(keyword);
    }
  },

  search(keyword) {
    const kw = keyword.toLowerCase();
    const filtered = this.data.lines.filter(l => {
      return l.id.includes(keyword) ||
        l.start.includes(keyword) ||
        l.end.includes(keyword) ||
        l.stations.some(s => s.name.includes(keyword));
    });
    this.setData({ filteredLines: filtered });
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    let filtered = this.data.lines;
    
    if (tab === 'urban') {
      filtered = filtered.filter(l => l.type === '城区');
    } else if (tab === 'rural') {
      filtered = filtered.filter(l => l.type === '城乡');
    }
    
    this.setData({ activeTab: tab, filteredLines: filtered });
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id });
  }
});