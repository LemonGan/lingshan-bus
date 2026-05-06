Page({
  data: {
    appName: '灵山巴士通',
    version: '1.0.0',
    desc: '灵山本地公交查询工具，收录城区+城乡16条公交线路，实时查看站点到站时间。',
    social: [
      { platform: '小红书', name: 'LemonCode｜程序员的日常', icon: '📕' },
      { platform: '抖音', name: 'LemonCode', icon: '🎵' },
    ],

  },
  copyAccount: function(e) {
    var text = e.currentTarget.dataset.text;
    wx.setClipboardData({
      data: text,
      success: function() {
        wx.showToast({ title: '已复制', icon: 'success' });
      }
    });
  },

  goHome: function() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});
