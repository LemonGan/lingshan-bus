const api = require('../../utils/config');

Page({
  data: {
    content: '',
    contact: '',
    submitting: false,
    submitSuccess: false
  },

  onContentInput(e) {
    this.setData({ content: e.detail.value });
  },

  onContactInput(e) {
    this.setData({ contact: e.detail.value });
  },

  submitFeedback() {
    const content = this.data.content.trim();
    const contact = this.data.contact.trim();

    if (!content) {
      wx.showToast({ title: '请输入留言内容', icon: 'none' });
      return;
    }

    this.setData({ submitting: true });

    wx.request({
      url: api.BASE_URL + '/api/feedback',
      method: 'POST',
      header: { 'content-type': 'application/json' },
      timeout: api.REQUEST_TIMEOUT,
      data: {
        content: content,
        contact: contact,
        source: 'lingshan-bus'
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data && res.data.ok) {
          this.setData({
            content: '',
            contact: '',
            submitSuccess: true,
            submitting: false
          });
          wx.showToast({ title: '提交成功', icon: 'success' });
        } else {
          const msg = (res.data && res.data.message) || '提交失败，请重试';
          wx.showToast({ title: msg, icon: 'none' });
          this.setData({ submitting: false });
        }
      },
      fail: (err) => {
        console.error('Feedback submit failed:', err);
        wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' });
        this.setData({ submitting: false });
      }
    });
  },

  writeMore() {
    this.setData({ submitSuccess: false });
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  },

  goAbout() {
    wx.switchTab({ url: '/pages/about/about' });
  }
});
